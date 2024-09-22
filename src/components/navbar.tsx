'use client';
import { useState, useEffect } from 'react';
import { auth } from "@/lib/firebaseConfig";
import { IconLogout } from '@tabler/icons-react'; 

import { signOut } from "firebase/auth";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Auth error:', error);
    }
  }, [error]);

  const handleBlogClick = () => {
    if (!user) {
      router.push('/sign-in'); // Redirect to sign-in page if not logged in
    } else {
      router.push('/blog'); // Redirect to blog page if logged in
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={item.href === '/blog' ? handleBlogClick : () => router.push(item.href)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <item.icon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        {user && (
  <DockIcon>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleSignOut}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-9 flex items-center justify-center"
          )}
        >
          {/* Icon */}
          <IconLogout className="w-5 h-6 text-neutral-700 dark:text-neutral-300" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Sign Out</p>
      </TooltipContent>
    </Tooltip>
  </DockIcon>
)}


      </Dock>
    </div>
  );
}
