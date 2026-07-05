import Link from "next/link";
import { Logo, Github, Insta, Telegram } from "@/components/logo";

const socialMedias = [
  {
    logo: (
      <Logo className="size-6 font-mono text-4xl" />
    ),
    href: "/",
  },
  {
    logo: (
      <Insta className="size-6 text-muted-foreground hover:text-primary block" />
    ),
    href: "https://instagram.com/codepedia.top",
  },
  {
    logo: (
      <Telegram className="size-6 text-muted-foreground hover:text-primary block" />
    ),
    href: "https://t.me/codepedia_top",
  },
  {
    logo: (
      <Github className="size-6 text-muted-foreground hover:text-primary block" />
    ),
    href: "https://github.com/codepedia-top",
  },
];

export default function FooterSection() {
  return (
    <footer className="sticky bottom-0 z-0 h-72 overflow-hidden bg-card">
      {/* Decorative Text */}
 <h2 className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 select-none text-[5rem] font-black tracking-tight text-muted/20 md:text-[10rem] lg:text-[14rem]">
        CODEPEDIA
      </h2>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-canter items-center px-6 py-10">

        <div className="my-2 flex flex-wrap justify-center gap-6 text-sm">
          {socialMedias.map((socialMedia, index) => (
            <Link href={socialMedia.href} key={index}>
              {socialMedia.logo}
            </Link>
          ))}
        </div>

        <span className="text-center text-sm text-muted-foreground">
          © 2026 تمامی حقوق برای کدپدیا محفوظ است.
        </span>
      </div>
    </footer>
  );
}
