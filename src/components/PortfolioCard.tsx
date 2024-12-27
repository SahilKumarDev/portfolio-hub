import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import ShineBorder from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BlurFade from "./ui/blur-fade";
import { FaGithub } from "react-icons/fa6";
import { IPortfolio } from "@/types/portfolio.type";

export const PortfolioCard = ({ data }: { data: IPortfolio }) => (
  <BlurFade inView className="bg-transparent">
    <ShineBorder
      borderRadius={10}
      className="md:shadow-xl p-0"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      <Card className="bg-neutral-800">
        <Link href={data.portfolioLink} target="_blank" rel="noreferrer">
          <CardContent className="px-4 pb-2">
            <Image
              width={200}
              height={200}
              className="w-full h-56 object-cover rounded-b-lg bg-[#FFFFFF]"
              src={data.portfolioImage}
              alt={`${data.portfolioName} project preview`}
            />
          </CardContent>
        </Link>
        <CardFooter className="px-4 pb-0 flex-col">
          <CardContent className="flex items-center justify-between w-full p-0">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={""}>
                      <FaGithub size={24} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{data.portfolioName || "Sahil Kumar Dev"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <CardTitle className="text-gray-200 text-xl font-medium line-clamp-1">
                {data.portfolioName || "Sahil Kumar Dev"}
              </CardTitle>
            </div>
            <Link href={data.portfolioLink} target="_blank" rel="noreferrer">
              <Button className="group text-light-chai" variant="link">
                Live
                <ArrowRight
                  className="hover:opacity-60 underline transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="w-full px-0 text-gray-300">
            <p className="line-clamp-2">
              Portfolio Hub is a curated showcase of outstanding creative work
              from designers, developers, and artists across the globe. Our
              platform offers a seamless experience for both creators and
              visitors to explore and inspire.
            </p>
          </CardFooter>
        </CardFooter>
      </Card>
    </ShineBorder>
  </BlurFade>
);
