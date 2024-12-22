import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarSvg } from "@/utils/IconSvg";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl pt-6 lg:pt-14 space-y-2 lg:space-y-4 px-4 flex flex-col justify-center items-center">
        <Badge
          variant={"secondary"}
          className="rounded-full gap-2 py-1 px-3 text-sm"
        >
          <StarSvg fill="fill-yellow-400" />
          <h4>Discover New Portfolios Weekly</h4>
        </Badge>
        <div>
          <h1 className="font-orbit-max text-3xl lg:text-7xl font-extrabold text-center md:text-left">
            Discover Exceptional Portfolios from Creative Professionals
            Worldwide
          </h1>
          <p className="lg:text-xl text-base text-white-60 tracking-wide">
            Portfolio Hub is a curated showcase of outstanding creative work
            from designers, developers, and artists across the globe. Our
            platform offers a seamless experience for both creators and visitors
            to explore and inspire.
          </p>
        </div>
        <div className="gap-y-3 flex flex-col lg:flex-row gap-x-4">
          <Link href={"/portfolios"} className="w-full md:w-fit">
            <Button className="text-lg font-orbit-max py-5 w-full">
              Browse Portfolios
            </Button>
          </Link>
          <Link
            target="_blank"
            href={"https://github.com/SahilKumarDev/portfolio-hub"}
            className="w-full md:w-fit"
          >
            <Button
              variant={"outline"}
              className="text-lg font-orbit-max py-5 w-full"
            >
              Star on GitHub
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
