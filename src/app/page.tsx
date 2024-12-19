import { TheamToggler } from "@/components/TheamToggler";
import { Button } from "@/components/ui/button";
import React from "react";

const AppPage = () => {
  return (
    <>
      <div className="background-gradient" />

      <div className="w-full h-screen flex justify-center items-center gap-4">
        <Button>Started Project</Button>
        <TheamToggler />
      </div>
    </>
  );
};

export default AppPage;
