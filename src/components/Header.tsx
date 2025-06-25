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

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setModalOpen] = useState(false);
  return (
    <>
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
      <header className="bg-white flex  justify-between  md:pr-4 pr-2  py-4 w-full text-white  h-[70px]">
        <div className="  ">
          <Image
            src="/logo.jpg"
            alt="Company Logo"
            fill
            onClick={() => router.push("/")}
            className="!h-[12rem] mt-[-4rem] !w-auto md:ml-[-1.8rem] ml-[-.6rem]"
          />
        </div>
        <div className="flex gap-3">
          {pathname !== "/catalogue-of-videos" && (
            <div
              className="text-[18px] font-medium mt-[4px] mr-2 text-black cursor-pointer"
              onClick={() => router.push("./catalogue-of-videos")}
            >
              Video Library
            </div>
          )}
          {pathname === "/catalogue-of-videos" && (
            <div className="md:hidden block  absolute md:top-[2rem] md:right-5 top-[1.2rem] right-[.5rem]  height-30">
              <Link href="/generate-videos">
                <span className="underline inline-flex cursor-pointer gap-3 text-[#2463e9] text-[16px] font-medium px-3 py-1 justify-center rounded-[8px]  hover:opacity-90">
                  Generate AI Video
                </span>
              </Link>
            </div>
          )}
          {pathname === "/" && (
            <div
              className="text-[18px] md:block hidden font-medium mt-[4px] text-[#2463e9] underline cursor-pointer"
              onClick={() => router.push("./generate-videos")}
            >
              Try for free
            </div>
          )}
          {pathname !== "/" && (
            <button
              className="md:block hidden md:px-6 px-2  "
              onClick={() => setModalOpen(true)}
            >
              <div className="md:text-[13px] text-[10px]">Get a quote</div>
            </button>
          )}
          {pathname !== "/" && (
            <button
              onClick={() => setModalOpen(true)}
              className="md:hidden block fixed -left-8 top-[50%] rotate-90 px-4 py-2 z-50"
            >
              <div className="text-[13px] ">Get a quote</div>
            </button>
          )}
        </div>
      </header>
    </>
  );
};
