"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Extracted from the Figma design (Design > Homepage > nav-bar)
const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

const LINK_TEXT =
  "font-sans text-base leading-[1.8] tracking-[-0.2px] text-white"
const SIGN_IN_TEXT =
  "font-[family-name:var(--font-manrope)] text-lg leading-[1.45] font-semibold text-[#5C53FE]"
const GET_STARTED_TEXT =
  "font-[family-name:var(--font-instrument-sans)] text-lg leading-[1.45] font-medium text-white"

const focusRing =
  "outline-none focus-visible:ring-3 focus-visible:ring-[#5C53FE]/60"

function Logo() {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("flex shrink-0 items-center rounded-lg", focusRing)}
    >
      <Image
        src="/logo.png"
        alt="HireLoop"
        width={308}
        height={88}
        priority
        className="h-11 w-auto"
      />
    </Link>
  )
}

function NavLinks() {
  const pathname = usePathname()

  return NAV_LINKS.map((link) => {
    const isActive = pathname === link.href

    return (
      <li key={link.href}>
        <Link
          href={link.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            LINK_TEXT,
            focusRing,
            "hover:text-white/70",
            isActive && "font-bold underline decoration-2 underline-offset-4"
          )}
        >
          {link.label}
        </Link>
      </li>
    )
  })
}

// Interactive CTAs shared by the desktop bar and the mobile drawer.
// Sign In = plain purple text link, Get Started = indigo pill.
// Design spec (px): radius 12, 18px text, Get Started bg #5C53FE.
function NavBarActions() {
  return (
    <>
      <Link
        href="/login"
        className={cn(
          SIGN_IN_TEXT,
          focusRing,
          "flex h-11 items-center rounded-lg px-3 py-2 hover:text-[#5C53FE]/80"
        )}
      >
        Sign In
      </Link>
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        size="lg"
        className={cn(
          GET_STARTED_TEXT,
          "h-11 rounded-[12px] bg-[#5C53FE] px-6 py-0 hover:bg-[#5C53FE]/90"
        )}
      >
        Get Started
      </Button>
    </>
  )
}

function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 bg-transparent px-3 py-1 sm:px-4">
      <Logo />

      <nav aria-label="Main navigation" className="flex items-center gap-4">
        {/* Desktop: links + divider + CTAs in the dark pill */}
        <div className="hidden h-[56px] items-center rounded-[16px] bg-[#222222] px-5 md:flex">
          <ul className="flex items-center gap-6">
            <NavLinks />
          </ul>
          <span aria-hidden="true" className="mx-6 h-5 w-px bg-[#A8A8A8]/40" />
          <div className="flex items-center gap-3">
            <NavBarActions />
          </div>
        </div>

        {/* Tablet/mobile: hamburger menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#222222] text-white hover:bg-[#222222]/70 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon className="size-6" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] gap-0 border-l border-white/10 bg-[#222222] text-white"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Logo />
            </SheetHeader>
            <ul className="flex flex-col gap-5 px-6 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href

                return (
                  <li key={link.href}>
                    <SheetClose
                      render={<Link href={link.href} />}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        LINK_TEXT,
                        focusRing,
                        "block hover:text-white/70",
                        isActive &&
                          "font-bold underline decoration-2 underline-offset-4"
                      )}
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                )
              })}
            </ul>
            <SheetFooter className="flex-col gap-2 border-t border-white/10 pt-4 pb-6">
              <SheetClose
                render={<Link href="/login" />}
                className={cn(
                  SIGN_IN_TEXT,
                  focusRing,
                  "flex h-12 w-full items-center justify-center rounded-xl hover:bg-white/5"
                )}
              >
                Sign In
              </SheetClose>
              <Button
                render={<SheetClose />}
                nativeButton={false}
                size="lg"
                className={cn(
                  GET_STARTED_TEXT,
                  "h-12 w-full rounded-xl bg-[#5C53FE] py-0 hover:bg-[#5C53FE]/90"
                )}
              >
                Get Started
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export { Navbar }
