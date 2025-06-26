"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import HubspotForm from "./HubspotForm";
import Link from "next/link";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const navs = [
  { id: 1, name: "Home", href: "/#hero" },
  { id: 2, name: "Features", href: "/#feature" },
  { id: 3, name: "How it Works", href: "/#program-feature" },
];

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: {
      id: number;
      name: string;
      href: string;
    }
  ) => {
    e.preventDefault();
    const targetId = item.href.substring(2);
    router.push(item.href);
    setActiveSection(targetId);
  };

  return (
    <div className="relative container mx-auto">
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        className="rounded-xl"
        fullWidth
        onClose={() => setModalOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="left">{"Get a quote"}</DialogTitle>
        <Divider />
        <DialogContent>
          <HubspotForm id="get_a_quote" />
        </DialogContent>
      </Dialog>
      <header className="fixed top-5 left-0 right-0 mx-auto z-[999] w-full px-4 sm:px-6">
        <div className="bg-[rgba(255,255,255,0.5)] backdrop-blur-lg border border-gray-400/30 flex justify-between w-full text-white z-[999] rounded-2xl h-[56px] max-w-4xl px-4 mx-auto">
          <div className="flex justify-center items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={"/v2/brand/logo-dark.svg"}
                alt={`Datareel Logo`}
                priority
                width={2250}
                height={800}
                className="h-10 w-auto object-contain dark:hidden md:h-12"
              />
              <Image
                src={"/v2/brand/logo-light.svg"}
                alt={`Datareel Logo`}
                priority
                width={2250}
                height={800}
                className="hidden h-10 w-auto object-contain dark:block md:h-12"
              />
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center gap-3">
            <ul className="relative mx-auto gap-4 flex w-fit items-center justify-center rounded-full px-2">
              {navs.map((item) => (
                <li
                  key={item.name}
                  className={`z-10 flex gap-4 h-full rounded-full px-3 py-1.5 cursor-pointer items-center justify-center text-sm font-medium leading-none transition-colors duration-200 ${
                    activeSection === item.href.substring(2)
                      ? "text-foreground bg-white/50 backdrop-blur-md"
                      : "text-foreground/60 hover:text-foreground"
                  } tracking-tight`}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleClick(e, item)}
                    className="leading-none"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center items-center gap-4">
            {pathname === "/catalogue-of-videos" && (
              <div className="md:hidden block  absolute md:top-[2rem] md:right-5 top-[1.2rem] right-[.5rem]  height-30">
                <Link href="/generate-videos">
                  <span className="underline inline-flex cursor-pointer gap-3 text-secondary text-[16px] font-medium px-3 py-1 justify-center rounded-[8px]  hover:opacity-90">
                    Generate AI Video
                  </span>
                </Link>
              </div>
            )}

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center rounded-full border border-white/[0.12] bg-secondary px-5 py-2 text-xs font-medium tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out active:scale-95 cursor-pointer"
            >
              Get a quote
            </button>

            {/* {pathname !== "/" && (
            <button
              className="md:block hidden md:px-6 px-2  "
              onClick={() => setModalOpen(true)}
            >
              <div className="md:text-[13px] text-[10px]">Get a quote</div>
            </button>
          )} */}
          </div>
        </div>
      </header>
    </div>
  );
};
