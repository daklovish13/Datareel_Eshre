"use client";
import HubspotForm from "@/components/HubspotForm";
import ProgramFeatures from "@/components/ProgramFeatures";
import CTASection from "@/components/cta-section";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { BarChart3, Globe, DollarSign, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const hero = {
  badgeIcon: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-[#364153]"
    >
      <path d="M7.62758 1.09876C7.74088 1.03404 7.8691 1 7.99958 1C8.13006 1 8.25828 1.03404 8.37158 1.09876L13.6216 4.09876C13.7363 4.16438 13.8316 4.25915 13.8979 4.37347C13.9642 4.48779 13.9992 4.6176 13.9992 4.74976C13.9992 4.88191 13.9642 5.01172 13.8979 5.12604C13.8316 5.24036 13.7363 5.33513 13.6216 5.40076L8.37158 8.40076C8.25828 8.46548 8.13006 8.49952 7.99958 8.49952C7.8691 8.49952 7.74088 8.46548 7.62758 8.40076L2.37758 5.40076C2.26287 5.33513 2.16753 5.24036 2.10123 5.12604C2.03492 5.01172 2 4.88191 2 4.74976C2 4.6176 2.03492 4.48779 2.10123 4.37347C2.16753 4.25915 2.26287 4.16438 2.37758 4.09876L7.62758 1.09876Z" />
      <path d="M2.56958 7.23928L2.37758 7.34928C2.26287 7.41491 2.16753 7.50968 2.10123 7.624C2.03492 7.73831 2 7.86813 2 8.00028C2 8.13244 2.03492 8.26225 2.10123 8.37657C2.16753 8.49089 2.26287 8.58566 2.37758 8.65128L7.62758 11.6513C7.74088 11.716 7.8691 11.75 7.99958 11.75C8.13006 11.75 8.25828 11.716 8.37158 11.6513L13.6216 8.65128C13.7365 8.58573 13.8321 8.49093 13.8986 8.3765C13.965 8.26208 14 8.13211 14 7.99978C14 7.86745 13.965 7.73748 13.8986 7.62306C13.8321 7.50864 13.7365 7.41384 13.6216 7.34828L13.4296 7.23828L9.11558 9.70328C8.77568 9.89744 8.39102 9.99956 7.99958 9.99956C7.60814 9.99956 7.22347 9.89744 6.88358 9.70328L2.56958 7.23928Z" />
      <path d="M2.37845 10.5993L2.57045 10.4893L6.88445 12.9533C7.22435 13.1474 7.60901 13.2496 8.00045 13.2496C8.39189 13.2496 8.77656 13.1474 9.11645 12.9533L13.4305 10.4883L13.6225 10.5983C13.7374 10.6638 13.833 10.7586 13.8994 10.8731C13.9659 10.9875 14.0009 11.1175 14.0009 11.2498C14.0009 11.3821 13.9659 11.5121 13.8994 11.6265C13.833 11.7409 13.7374 11.8357 13.6225 11.9013L8.37245 14.9013C8.25915 14.966 8.13093 15 8.00045 15C7.86997 15 7.74175 14.966 7.62845 14.9013L2.37845 11.9013C2.2635 11.8357 2.16795 11.7409 2.10148 11.6265C2.03501 11.5121 2 11.3821 2 11.2498C2 11.1175 2.03501 10.9875 2.10148 10.8731C2.16795 10.7586 2.2635 10.6638 2.37845 10.5983V10.5993Z" />
    </svg>
  ),
  badge: "ESHRE 2025 Interactive Demo Station",
  title: "Transform Data into Dynamic Video Stories", // Updated headline to be shorter
  description:
    "Convert Data into AI powered video at scale - with your custom avatars, video cloning, branding, and advanced analytics",
  cta: {
    primary: {
      text: "Request a Demo",
      href: "#contact",
    },
  },
};
const features = [
  {
    icon: User,
    title: "AI Avatars",
    description:
      "Realistic doctor avatars with voice cloning technology that creates personalized medical communications at enterprise scale.",
  },
  {
    icon: BarChart3,
    title: "Data Driven",
    description:
      "Convert complex medical data into visual stories that patients can easily understand and engage with.",
  },
  {
    icon: Globe,
    title: "Scale Globally",
    description:
      "100+ languages with natural voices for multilingual healthcare communication across diverse patient populations.",
  },
  {
    icon: DollarSign,
    title: "Cost Effective",
    description:
      "Starting from $0.50 per video, making personalized healthcare communication accessible and scalable for any organization.",
  },
];

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const breakpoint = 768;
  const [open, setModalOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) return null;
  // isMobile ? (
  //   <HorizontalLinearStepper />
  // ) :
  return (
    <div className="max-w-7xl container mx-auto relative">
      <div className="relative min-h-screen">
        <main className="pt-10">
          <section className="hero">
            <div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-8 pt-28">
              <div className="mx-auto flex flex-col justify-center items-center gap-2">
                <p className="flex h-8 items-center gap-2 rounded-full border border-gray-400/50 bg-accent px-3 text-sm">
                  {hero.badgeIcon}
                  {hero.badge}
                </p>
                <p className="px-4 text-xs md:text-sm font-semibold py-1.5 rounded-full text-secondary text-center">
                  #1 AI VIDEO GENERATION PLATFORM FOR IVF CLINICS
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-balance text-center text-3xl font-medium tracking-tighter leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
                  {hero.title}
                </h1>
                <p className="text-balance text-center text-sm sm:text-base font-medium leading-relaxed tracking-tight text-foreground/60 md:text-lg mt-2">
                  {hero.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <Link
                  className="hover:bg-secondary/80 flex items-center justify-center rounded-full border border-white/[0.12] bg-secondary px-5 py-2 text-sm font-normal tracking-wide text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out active:scale-95 dark:text-secondary-foreground"
                  href="/try"
                >
                  Start Demo
                </Link>
                {/* {hero.cta.secondary && (
              <button className="h-10 flex items-center justify-center w-32 px-5 text-sm font-normal tracking-wide text-primary rounded-full transition-all ease-out active:scale-95 bg-white dark:bg-background border border-[#E5E7EB] dark:border-[#27272A] hover:bg-white/80 dark:hover:bg-background/80">
                {hero.cta.secondary.text}
              </button>
            )} */}
              </div>
            </div>
          </section>

          <section id="feature" className="md:pt-24 pt-12">
            <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl mx-auto p-2 md:p-6">
              {/* Feature Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="group">
                    <div className="border bg-white/20 backdrop-blur-md border-foreground/10 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 overflow-hidden h-full">
                      <div className="p-6 md:p-10">
                        <div className="flex items-center gap-6 mb-4">
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-foreground/70 leading-relaxed text-sm sm:text-base font-medium">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Program Features */}
        <section id="program-feature" className="pb-12 pt-6">
          <ProgramFeatures />
          <CTASection />
        </section>
      </div>
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
          <HubspotForm id="get_a_quotes" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
