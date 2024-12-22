"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { creationTopic, works } from "@/utils/Data";
import { useState, useEffect } from "react";
import { PortfolioBox } from "./PortfolioBox";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CreatorProfile {
  name: string;
  img: string;
}

interface CreationTopic {
  topic: string;
}

interface Work {
  title: string;
  link: string;
  description: string;
  imageUrl: string;
  createrDetails: CreatorProfile;
  value: string;
}

const shuffleArray = (array: Work[]): Work[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function TopPortfolio(): JSX.Element {
  const [shuffledWorks, setShuffledWorks] = useState<Work[]>([]);

  useEffect(() => {
    setShuffledWorks(shuffleArray(works));
  }, []);

  return (
    <Tabs defaultValue="all" className="mt-4 md:mt-8">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {creationTopic.map((topic: CreationTopic) => (
            <TabsTrigger key={topic.topic} value={topic.topic}>
              {topic.topic
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <Link href={"/portfolios"} target="_blank" rel="noreferrer">
          <Button className="group text-light-chai" variant="link">
            View All
            <ArrowRight
              className="hover:opacity-60 underline transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </Link>
      </div>

      <TabsContent value="all">
        <section className="grid md:grid-cols-3 gap-8 justify-items-center py-10">
          {shuffledWorks.map((work: Work, idx: number) => (
            <PortfolioBox key={work.title} {...work} idx={idx} />
          ))}
        </section>
      </TabsContent>

      {creationTopic.map((topic: CreationTopic) => (
        <TabsContent key={topic.topic} value={topic.topic}>
          <section className="grid md:grid-cols-3 gap-8 justify-items-center py-10">
            {shuffledWorks
              .filter((work: Work) => work.value === topic.topic)
              .map((work: Work, idx: number) => (
                <PortfolioBox key={work.title} {...work} idx={idx} />
              ))}
          </section>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default TopPortfolio;
