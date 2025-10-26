"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

const Test = () => {
  const handleClick = (mode: boolean) => {
    if (mode) {
      toast.success("This is a success toast!");
    } else {
      toast.error("This is an error toast!");
    }
  };
  return (
    <div>
      <Button
        variant="link"
        className="underline"
        onClick={() => handleClick(false)}
      >
        Test Button
      </Button>
    </div>
  );
};

export default Test;
