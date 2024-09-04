"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { user } = useUser();
  const route = usePathname();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg translate-all">
      <MaxWidthWrapper>
        <div className="flex justify-between pl-2 pr-2 items-center h-full w-full">
          <div className="flex h-full items-center gap-2">
            <Link href="/">
              <img
                src="/logo.jpg"
                className="lg:h-10 lg:w-10 h-8 w-8 rounded-full"
              />
            </Link>
            <Link href="/" className="font-bold text-2xl">
              Relationz
            </Link>
          </div>

          <div className="items-center space-x-4 sm:flex">
            {user ? null : (
              <Button
                variant={"ghost"}
                asChild
                className="border-[color:var(--secondary-500)] border sm:border-0"
              >
                <Link href="/sign-in" className="text-lg font-bold">
                  Sign In
                </Link>
              </Button>
            )}

            {user ? null : (
              <span
                className="h-6 w-px bg-gray-200 hidden sm:flex"
                aria-hidden="true"
              />
            )}

            {user ? (
              <div className="flex h-full items-center gap-1 space-x-4">
                <div className="hidden md:flex h-full items-center justify-center space-x-1">
                <Button
                    variant={"ghost"}
                    asChild
                    className={"border-[color:var(--secondary-500)] border sm:border-0" + (route === "/dashboard" ? " bg-slate-200" : "")}
                  >
                    <Link href="/dashboard" className="text-lg font-bold">
                      Dashboard
                    </Link>
                  </Button>
                {/* <Button
                    variant={"ghost"}
                    asChild
                    className={"border-[color:var(--secondary-500)] border sm:border-0" + (route === "/your-team" ? " bg-slate-200" : "")}
                  >
                    <Link href="/your-team" className="text-lg font-bold">
                      Your Team
                    </Link>
                  </Button> */}
                  <Button
                    variant={"ghost"}
                    asChild
                    className={"border-[color:var(--secondary-500)] border sm:border-0" + (route === "/leads" ? " bg-slate-200" : "")}
                  >
                    <Link href="/leads" className="text-lg font-bold">
                      Leads
                    </Link>
                  </Button>
                  <Button
                    variant={"ghost"}
                    asChild
                    className={"border-[color:var(--secondary-500)] border sm:border-0" + (route === "/deals" ? " bg-slate-200" : "")}
                  >
                    <Link href="/deals" className="text-lg font-bold">
                      Deals
                    </Link>
                  </Button>
                </div>
                <span
                  className="h-6 w-px bg-gray-200 hidden md:flex"
                  aria-hidden="true"
                />
                <SignOutButton>
                  <Button>Signout</Button>
                </SignOutButton>
              </div>
            ) : (
              <Button className="hidden sm:flex" asChild>
                <Link href="/sign-up" className="text-lg font-bold">
                  Let&apos;s get started
                </Link>
              </Button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
