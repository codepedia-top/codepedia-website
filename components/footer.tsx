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
      <h2
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none font-black tracking-tighter text-[7rem] md:text-[12rem] lg:text-[16rem] text-muted/10 whitespace-nowrap"
      >
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
