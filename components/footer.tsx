import Link from "next/link";
import { Logo, Github, Insta, Telegram } from "@/components/logo";

const socialMedias = [
  {
    logo: <Insta className="size-6 text-muted-foreground hover:text-primary block" />,
    href: "https://instagram.com/codepedia.top",
  },
  {
    logo: <Telegram className="size-6 text-muted-foreground hover:text-primary block" />,
    href: "https://t.me/codepedia_top",
  },
  {
    logo: <Github className="size-6 text-muted-foreground hover:text-primary block" />,
    href: "https://github.com/codepedia-top",
  },
];

export default function FooterSection() {
  return (
    <footer className="py-8 md:py-16 bg-secondary -z-20">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          <Logo className="h-8 font-mono text-4xl" />
        </Link>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {socialMedias.map((socialMedia, index) => (
            <Link href={socialMedia.href} key={index}>
              {socialMedia.logo}
            </Link>
          ))}
        </div>
      </div>

      <span className="text-muted-foreground block text-center text-sm">
        {" "}
        © {2026} تمامی حقوق برای کدپدیا محفوظ است
      </span>
    </footer>
  );
}
