import React, { FormEventHandler } from "react";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

const GoBackButton = ({
  onClick,
}: {
  onClick: FormEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      variant={"link"}
      className="flex flex-row flex-shrink scale-95 hover:scale-105 duration-200 ease-in-out group gap-1 hover:-translate-x-1 transition-transform"
      onClick={onClick}
    >
      <ArrowLeft className="h-4 w-4 overflow-hidden  translate-x-1 group-hover:-translate-x-1 ease-in-out transition-transform" />
      Go Back
    </Button>
  );
};

export default GoBackButton;
