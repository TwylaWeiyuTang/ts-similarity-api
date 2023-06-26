import { getServerSession } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import Button, { buttonVariants } from "./ui/Button";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import ThemeToggle from "./ThemeToggle";
import { authOptions } from "@/lib/auth";
import MenuOptions from "./MenuOptions";

const Navbar = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-full mx-auto w-full flex justify-between items-center lg:px-10">
        <Link
          href="/"
          className={
            buttonVariants({ variant: "link" }) &&
            "text-lg font-bold dark:text-white"
          }
        >
          DeTex
        </Link>

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>

          {session ? (
            <>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/playground"
              >
                Playground
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>

        <div className="md:hidden">
          <MenuOptions />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
