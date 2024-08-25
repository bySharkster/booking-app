import React, { ReactNode } from "react";
import { Card } from "./card";

const BookingCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-dvh bg-background p-1 flex items-center justify-center w-full">
      <Card className="relative neuro-shadow w-full min-h-[600px] md:mx-4 overflow-hidden rounded-2xl z-0 justify-center flex flex-col items-center">
        <div className="absolute w-full h-full opacity-60 bg-background -z-[1]"></div>
        {children}
      </Card>
    </div>
  );
};

export default BookingCard;
