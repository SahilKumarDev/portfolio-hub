"use client";

import { TheamToggler } from "@/components/TheamToggler";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Header = () => {
  const path = usePathname();

  const NAV_ITEM = [
    { label: "Showcase", href: "/showcase" },
    { label: "Service", href: "#service" },
    { label: "Process", href: "#process" },
    { label: "Guarantee", href: "#guarantees" },
  ];

  const SHOW_NAV_ITEM = [
    { label: "Home", href: "/" },
    { label: "Showcase", href: "/showcase" },
  ];

  return (
    <Card className="top-5 sticky md:mx-auto z-30 xl:w-10/12 flex-between py-4 px-4 md:px-8 mx-6">
      <Link href={"/"}>
        {/* <Image src={villanCreation} alt="Logo" width={200} height={200} /> */}

        <h1>PORTFOLIO HUB</h1>
      </Link>

      <CardContent className="py-0 px-0 hidden gap-x-4 md:flex items-center">
        {path === "/showcase" || path === "/meeting" ? (
          <>
            {SHOW_NAV_ITEM.map((item, index) => {
              return (
                <Link key={index} href={item.href}>
                  <Button
                    variant={"ghost"}
                    className="hover:text-light-chai text-base"
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </>
        ) : (
          <>
            {NAV_ITEM.map((item, index) => {
              return (
                <Link key={index} href={item.href}>
                  <Button
                    variant={"ghost"}
                    className="hover:text-light-chai text-base"
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </>
        )}
        <Button>Book a Call</Button>
      </CardContent>

      <TheamToggler />
    </Card>
  );
};

export default Header;
