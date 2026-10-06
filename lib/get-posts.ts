import fs from "fs/promises";
import path from "path";
import { metadataSchema } from "./zodschemas";

const postsDir = path.join(process.cwd(), "content", "posts");

function extractMetadata(source: string) {
  const match = source.match(/export const metadata = ({[\s\S]*?});/);
  if (!match) return null;

  try {
    return new Function(`return ${match[1]}`)();
  } catch (err) {
    console.error("Failed to parse metadata:", err);
    return null;
  }
}

export async function getAllPosts() {
  const files = await fs.readdir(postsDir);

  const results = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (filename) => {
        try {
          const filePath = path.join(postsDir, filename);
          const source = await fs.readFile(filePath, "utf8");
          const parsed = metadataSchema.safeParse(extractMetadata(source));

          if (!parsed.success) {
            const message = parsed.error.issues
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join("; ");
            return { ok: false as const, filename, message };
          }

          return {
            ok: true as const,
            post: {
              slug: path.join("blog", filename.replace(/\.mdx$/, "")),
              metadata: parsed.data,
            },
          };
        } catch (err) {
          return {
            ok: false as const,
            filename,
            message: err instanceof Error ? err.message : String(err),
          };
        }
      })
  );

  const failures = results.filter((result) => !result.ok);

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`Invalid post "${failure.filename}":\n  ${failure.message}`);
    }
    throw new Error(
      `${failures.length} post(s) have invalid metadata: ` +
        `${failures.map((f) => f.filename).join(", ")}. Fix or remove them.`,
    );
  }

  return results.flatMap((result) => (result.ok ? [result.post] : []));
}
