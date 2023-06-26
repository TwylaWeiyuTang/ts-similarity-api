"use client";

import Image from "next/image";
import Paragraph from "../components/ui/Paragraph";
import { Metadata } from "next";
import LargeHeading from "@/components/ui/LargeHeading";
import Link from "next/link";
import useMousePosition from "@/helpers/useMousePosition";
import { useEffect, useLayoutEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Home() {
  const mousePosition = useMousePosition();

  useLayoutEffect(() => {
    if (mousePosition.x && mousePosition.y) {
      const heading = document.querySelector(".three-d") as HTMLElement;

      const textHorizontalMiddle =
        (heading.getBoundingClientRect().right +
          heading.getBoundingClientRect().left) /
        2;

      const textVerticalMiddle =
        (heading.getBoundingClientRect().top +
          heading.getBoundingClientRect().bottom) /
        2;

      const updatedMouseX = textHorizontalMiddle - mousePosition.x;
      const updatedMouseY = textVerticalMiddle - mousePosition.y;

      heading.style.transform = `translate(${-0.001 * updatedMouseX}%, ${
        -0.01 * updatedMouseY
      }%)`;
    }
  }, [mousePosition]);

  return (
    <>
      <div className="relative h-screen flex items-center justify-center overflow-x-hidden z-10">
        <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
          <div className="h-full gap-10 flex flex-col justify-center items-center">
            <div className="relative">
              <LargeHeading
                size={"lg"}
                className="three-d text-black dark:text-green"
              >
                DeTex <br />
                Effortlessly detect <br />
                text similarity.
              </LargeHeading>

              <LargeHeading
                size={"lg"}
                className="text-emerald-950/30 dark:text-pale-blue absolute top-0 -z-[1]"
              >
                DeTex <br />
                Effortlessly detect <br />
                text similarity.
              </LargeHeading>
            </div>

            <Paragraph className="max-w-xl lg:text-left">
              Unlock the ability to automate the process and achieve consistent
              and objective results for your next text comparison task.
            </Paragraph>

            <div className="absolute max-w-sm lg:max-w-lg top-0 left-0 right-0 rounded-full "></div>
            <Link href={"/login"}>
              <Button className="relative inline-flex items-center px-0.5 py-6 justify-center mb-2 mr-2 overflow-hidden text-lg text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-indigo-500/50 dark:bg-gradient-to-br dark:from-teal-300 dark:to-indigo-600 group-hover:from-teal-300 group-hover:to-lime-300 dark:group-hover:to-indigo-600 dark:text-white dark:hover:text-slate-800 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-indigo-800">
                <span className="relative px-5 py-2 transition-all ease-in duration-75 group-hover:bg-white dark:group-hover:bg-transparent dark:bg-gray-800 rounded-md bg-opacity-0">
                  Request API key
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
