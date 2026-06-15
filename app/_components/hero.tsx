import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Github, Insta, Telegram } from "@/components/logo";

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden pt-16">
      <div className="relative z-10 flex max-w-2xl flex-col gap-5 px-4">
        <a
          className={cn(
            "group flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow-xs",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out",
          )}
          href="#link"
        >
          <div className="pr-1">
            <ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
          </div>

          <span className="text-xs">جدید ترین داستان ما را بخوانید</span>
          <span className="block h-5 border-l" />

          <div className="rounded-xs border bg-card px-1.5 py-0.5 shadow-sm">
            <p className="font-mono text-xs">NEW</p>
          </div>
        </a>

        <h1
          className={cn(
            "text-balance font-medium text-4xl text-foreground leading-tight md:text-5xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out",
          )}
        >
            داستان‌هایی از سراسر دنیای کــد و تکنولـوژی
        </h1>

        <p
          className={cn(
            "text-muted-foreground text-sm tracking-wider sm:text-lg md:text-xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out",
          )}
        >
            من لذت میبرم از یادگیری کدنویسی و یاد دادن اون به  دیگران البته اینجا اگر چیزهایی خوب و جذاب بخونم برای شما هم ترجمه میکنم میارم پس با کدپدیا همراه بشید
        </p>

        <div className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
          <Button variant="outline">
            <Insta/>
          </Button>
          <Button variant="outline">
            <Telegram/>
          </Button>
          <Button variant="outline">
            <Github/>
          </Button>
        </div>
      </div>
    </section>
  );
}
