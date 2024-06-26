"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MinidenticonImg from "./avatar";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useUser } from "@clerk/nextjs";

const NavBar = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg translate-all">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center h-full w-full">
          <div className="flex h-full items-center gap-2">
            <img
              src="/logo.jpg"
              className="lg:h-10 lg:w-10 h-8 w-8 rounded-full"
            />
            <Link href="/" className="font-bold text-2xl">
              Relationz
            </Link>
          </div>

          <div className="hidden items-center space-x-4 sm:flex">
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
              <div className="flex h-full items-center gap-1">
              <h1 className="font-bold">Hi {user.firstName}!</h1>
              <MinidenticonImg username={ user.fullName} saturation="90" width="50" height="50" />
              </div>
            ) : (
              <Button className="hidden sm:flex" asChild>
                <Link href="/sign-up" className="text-lg font-bold">
                  Let's get started
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
