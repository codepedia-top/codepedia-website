"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export function HeroHeader() {
    const scrolled = useScroll(10)

    return (
        <header className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
            "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
            scrolled,
        })}>
            <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
                <Link
					className="p-2 hover:bg-muted dark:hover:bg-muted/50"
					href="#"
				>
					<Logo className="h-4" />
				</Link>
            <div className="hidden items-center gap-2 md:flex">
                <Button size="sm">Get Started</Button>
            </div>
            </nav>

        </header>
    )
}