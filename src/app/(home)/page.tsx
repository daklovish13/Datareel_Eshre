"use client";

import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const breakpoint = 768;

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
    <div className="pb-10">
      <Header />
      <div
        style={{ background: "url(Home.png)" }}
        className="!bg-no-repeat pb-8 relative bg-size md:px-8 px-2 items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]"
      >
        <main className=" md:pt-10 pt-10">
          <button className="px-4 text-[10px] font-semibold py-1 !rounded-2xl">
            #ONE AI VIDEO GENERATION PLATFORM FOR INDIRA IVF
          </button>

          <section className="hero ">
            <div className="text-[43px] my-4 lh-53 font-extrabold">
              Transform Data into <br className="md:block hidden" />
              Dynamic Video Stories
            </div>

            <p className="text-[#885CFA] text-[18px] font-medium mb-4">
              Personalized Healthcare Video Communication
            </p>

            <p
              className="text-[#747474] md:px-0 px-4 text-[15px] fbg font-medium mb-6"
              style={{ lineHeight: "130%" }}
            >
              Convert Data into AI powered video at scale - with your custom
              avatars,
              <br className="md:block hidden" />
              video cloning, branding, and advanced analytics
            </p>

            <Link href="/catelog-of-videos">
              <button className="rounded-md flex gap-4 justify-center text-[16px] font-medium mt-8 mx-auto w-[178px] py-2">
                Start Demo{" "}
                <div className="relative w-[15px] h-[15px] mt-1">
                  <Image
                    src="/right-arrow.png"
                    alt="right arrow"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            </Link>
          </section>

          <section className="grid md:grid-cols-2 xs:grid-cols-1 w-full md:gap-10 gap-5 md:py-24 py-12 md:px-0 px-8">
            {[
              {
                icon: "/face-detection.png",
                title: "AI Avatars",
                desc: "Realistic doctor avatars with voice cloning",
              },
              {
                icon: "/growth.png",
                title: "Data Driven",
                desc: "Convert complex data into visual stories",
              },
              {
                icon: "/earth.png",
                title: "Scale Globally",
                desc: "100+ languages with natural voices",
              },
              {
                icon: "/salary.png",
                title: "Cost Effective",
                desc: "$0.50 per video vs traditional production",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="feature items-center px-6 pr-16 h-[119px] flex gap-4 text-left"
              >
                <div className="relative w-[50px] h-[50px] mt-1">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-[19px] font-semibold">{feature.title}</p>
                  <p
                    className="text-[12px] font-medium text-[#747474]"
                    style={{ lineHeight: "130%" }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </main>

        {/* Program Features */}
        <div className="md:px-0 px-4 relative w-full">
          <div className="bg-white pb-8 rounded-lg shadow-lg px-8  w-full ">
            <div className="py-6">
              <p className="text-[26px] font-bold fbg text-center">
                Program Features
              </p>
              <p className="text-[15px] font-medium text-center text-[#747474] fbg">
                Enterprise healthcare video capabilities
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="bg-[#F7F7FF] mb-6 rounded-[8px] px-10 relative">
              <div className="text-[16px] font-bold py-3 fbg">
                Performance Metrics
              </div>
              <div className="flex flex-col sm:flex-row   pt-1 pb-4 md:justify-around items-center text-center w-full">
                <div className="md:pb-0 pb-2">
                  <p
                    className="bg-clip-text text-transparent font-bold text-[30px]"
                    style={{
                      background:
                        "linear-gradient(to left, #6864F4 30%, #855AE9 40%)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    78%
                  </p>
                  <p className="text-[14px] font-medium fbg">
                    Engagement Increase
                  </p>
                </div>
                <hr className="w-full text-gray-400 my-2 md:hidden block" />
                <div className="md:border-r-2 md:border-l-2  md:py-0 py-3  px-32 border-[#CCCCCC]">
                  <p
                    className="bg-clip-text text-transparent font-bold text-[30px]"
                    style={{
                      background:
                        "linear-gradient(to left, #6864F4 30%, #855AE9 40%)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    90%
                  </p>
                  <p className="text-[14px] font-medium fbg">Cost Reduction</p>
                </div>
                <hr className="w-full text-gray-400 my-2 md:hidden block" />
                <div className="md:pt-0 pt-2">
                  <p
                    className="bg-clip-text text-transparent font-bold text-[30px]"
                    style={{
                      background:
                        "linear-gradient(to left, #6864F4 30%, #855AE9 40%)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    $1.50
                  </p>
                  <p className="text-[14px] font-medium fbg">Per Video Cost</p>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:px-4 ">
              {[
                {
                  title: "Advanced Analytics",
                  icon: "/graph-svgrepo-com1.png",
                  desc: "Real-time engagement metrics, completion rates, and patient interaction insights",
                },
                {
                  title: "Engagement Tracking",
                  icon: "/graph-svgrepo-com2.png",
                  desc: "Monitor video effectiveness and patient comprehension levels across all touchpoints",
                },
                {
                  title: "Approval Workflow",
                  icon: "/graph-svgrepo-com3.png",
                  desc: "Multi-tier medical content review and compliance validation system",
                },
                {
                  title: "Smart Callbacks",
                  icon: "/graph-svgrepo-com4.png",
                  desc: "Automated follow-up scheduling based on patient engagement and care protocols",
                },
                {
                  title: "Feedback Collection",
                  icon: "/graph-svgrepo-com6.png",
                  desc: "Integrated patient satisfaction surveys and clinical outcome tracking",
                },
                {
                  title: "Enterprises Security",
                  icon: "/graph-svgrepo-com5.png",
                  desc: "zero-trust architecture and healthcare data protection",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-4 bg-[#F8F8F8] flex gap-4 md:px-6 px-1 items-center rounded-md text-left"
                >
                  <div className="md:block hidden">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="md:hidden block">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={70}
                      height={70}
                    />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium fbg mb-1">
                      {feature.title}
                    </p>
                    <p className="text-[13px] font-medium text-[#747474] fbg">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative w-full md:px-0 px-4 pb-6">
          <div className="bg-[#6C63FF] px-8 md:py-0 py-4 mt-10 text-white rounded-xl  md:flex block  items-center md:gap-6 gap-2  w-full">
            {/* Left Side Illustration */}
            <div className=" flex justify-center">
              <Image
                src="/Quote_front.png" // Replace with actual image path
                alt="Quote Illustration"
                width={250}
                height={250}
              />
            </div>

            {/* Right Side Text and Button */}
            <div className="w-full md:w-2/3 md:text-left text-center">
              <div>
                <p className="md:text-[20px] text-[16px] font-medium">
                  Tell us what you need, and we’ll craft a custom
                  <br className="md:block hidden" /> quote to bring your AI
                  video strategy to life.
                </p>
              </div>
              <button
                style={{ background: "white" }}
                className="mt-4 !text-[#6864F4] flex md:mx-0 mx-auto !text-[16px] !font-bold !px-4 !py-2 !rounded-[8px] !transition hover:!bg-gray-100"
              >
                Get a quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
