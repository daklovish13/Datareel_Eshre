"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-white flex  justify-between md:px-8 md:pr-4 pr-2  py-4 w-full text-white  h-[70px]">
      <div className="relative w-[135px] h-[40px] ">
        <Image
          src="/logo.png"
          alt="Company Logo"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex gap-2">
       {pathname!=="/"&& <button className="  md:px-6 px-3   ">
          <div className="text-[13px]">Get a Quote</div>
        </button>}

        <button className="h-fit p-1 md:px-6 px-4">
          <div className="pb-0 mb-0 text-[13px]">ESHRE 2025</div>
          <div className="text-[10px] -mt-1  font-light">
            Interactive Demo Station
          </div>
        </button>
      </div>
    </header>
  );
};
