"use client"

import BookingCard from "../bookingCard";
import { Button } from "../button";
import { CardContent } from "../card";

type confirmationProps = {
  date: Date;
  // time: string;
  // name: string;
  // email: string;
  // phone: E164Number | undefined;
  // address: string;
  // corte: string;
  // silla: number;
  reservationId: string;
};

export const Confirm = (({ date, reservationId } : confirmationProps) => {

  return (
    <div>
      <BookingCard>
        <CardContent className="w-full max-w-fit mx-auto px-1">
          <section className="border-2 rounded-xl border-slate-200 bg-card-foreground items-center flex flex-col justify-center text-black">
            <div className="flex items-center justify-between w-full sm:w-4/5 md:max-w-lg max-w-80 mb-4 z-[2] md:px-4 px-1 pt-6 ">
              <div className="text-sm text-muted-foreground">
                <div>Reservation made</div>
                <div>Tomorrow at {date.getHours()}</div>
              </div>
              <div className="bg-primary text-primary-foreground md:px-3 p-1 rounded-full text-xs font-medium">
                Confirmed
              </div>
            </div>
            <div className="text-center z-[2] md:px-6 ">
              <h2 className="text-xl md:text-2xl font-bold mb-2 ">
                Your reservation is confirmed!
              </h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re looking forward to seeing you in our Barber Shop.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 z-[2] px-4 md:px-12 mx-auto">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Date</div>
                <div className="font-medium">{date.toDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Barber</div>
                <div className="font-medium">Johny Joe</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div className="font-medium">A la derecha, Arroyo Puerto Rico</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Reservation ID
                </div>
                <div className="font-medium">{reservationId}</div>
              </div>
            </div>
            <div className="flex justify-center flex-col sm:flex-row w-full z-[2] px-6 pb-6 gap-2">
              <Button
                variant={"default"}
                size={"lg"}
                className="bg-background hover:bg-background/75 text-foreground  hover:text-foreground/75"
              >
                View Details
              </Button>
              <Button
                variant={"default"}
                size={"lg"}
                className="bg-foreground hover:bg-foreground/75 text-background hover:text-background/75"
              >
                Share Receipt
              </Button>
            </div>
          </section>
        </CardContent>
      </BookingCard>
    </div>
  );
});