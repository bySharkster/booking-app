"use client";

import React, { useMemo, memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";

export const Booking = () => {
  const [state, setState] = useState("booking");

  const renderComponent = useMemo(() => {
    switch (state) {
      case "details":
        return <DetailsComponent setState={setState} />;
      case "confirmation":
        return <ConfirmationComponent />;
      case "booking":
        return <BookingComponent setState={setState} />;
      default:
        return <BookingComponent setState={setState} />;
    }
  }, [state]);

  return <div className="grid">{renderComponent}</div>;
};

const BookingComponent = memo(
  ({ setState }: { setState: (state: string) => void }) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const handleClick = () => {
      setState("details");
    };

    return (
      <div className="min-h-screen bg-background flex items-center justify-center w-full">
        <div className="border-2 border-slate-300 rounded-xl shadow-xl hover:border-background p-2 md:p-6 transition-all md:w-4/12 grid items-center justify-center">
          <div className="border-2 rounded-xl border-slate-200 bg-card-foreground">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl text-input "
            />
            <div className="text-center py-2 ">
              <span className="text-input text-md">
                Dia de Recorte: {date?.toDateString()}
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-center py-6">
            <Button onClick={(e) => handleClick()} className="button">
              Details
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

BookingComponent.displayName = "BookingComponent";

const DetailsComponent = memo(
  ({ setState }: { setState: (state: string) => void }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Call the emailnotif API using axios
      axios
        .post("/api/emailnotif")
        .then((response: { data: any }) => {
          // Handle the response
          console.log(response.data);
        })
        .catch((error: any) => {
          // Handle the error
          console.error(error);
        });
    };

    return (
      <div className="min-h-screen bg-background grid items-center justify-center">
        <div className=" md:p-10 rounded-xl shadow-xl  my-12 transition-all md:w-10/12 flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 h-auto p-4 md:p-10 w-full md:w-[30dvw] bg-card-foreground overflow-hidden rounded-xl"
          >
            <label className="label">Name</label>
            <input
              type="text"
              id="name"
              className="input-custom text-input pl-2 my-2"
              placeholder="name"
              required
            />
            <label className="label">Email</label>
            <input
              className="input-custom text-input pl-2 my-2"
              type="text"
              placeholder="email"
              autoComplete="email"
              required
            />
            <label className="label">Phone</label>
            <input
              className="input-custom text-input pl-2 my-2"
              type="text"
              placeholder="phone"
              required
            />
            {/* This could be for barbers or home services 
            also it can be the location of the shop*/}
            {/* <label className="label">Address</label>
            <input
              className="input-custom text-input pl-2 my-2"
              type="text"
              placeholder="address"
            /> */}
            <label className="label">Corte</label>
            <select className="input-custom text-input pl-2 my-2">
              <option>Recorte y Barba</option>
              <hr />
              <option>Refinado</option>
              <option>Solo Recorte</option>
            </select>
            <label className="label">Barbero</label>
            <select className="input-custom text-input pl-2 my-2">
              <option value="n/a">Selecciona Uno</option>
              <hr className=" bg-background/80" />
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </form>
          <div className="w-full flex items-center justify-center py-6">
            <Button
              type="submit"
              onClick={() => setState("confirmation")}
              className="button"
            >
              confirmation
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

DetailsComponent.displayName = "DetailsComponent";

const ConfirmationComponent = memo(() => {
  return (
    <div className="min-h-screen bg-background grid items-center justify-center">
      <div className="bg-background text-card-foreground p-6 rounded-xl shadow-lg max-w-md mx-auto items-center border-accent border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            <div>Reservation made</div>
            <div>Tomorrow, 10:00 AM</div>
          </div>
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Confirmed
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            Your reservation is confirmed!
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;re looking forward to seeing you in our Barber Shop.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Date</div>
            <div className="font-medium">Tomorrow, 10:00 AM</div>
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
            <div className="font-medium">ABC123</div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="flex-1 mr-2">
            View Details
          </Button>
          <Button className="flex-1">Share Receipt</Button>
        </div>
      </div>
    </div>
  );
});

ConfirmationComponent.displayName = "ConfirmationComponent";
