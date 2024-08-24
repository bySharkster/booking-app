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

const BookingComponent = memo(({ setState }: { setState: (state: string) => void }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const handleClick = () => {
    setState("details");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="border-2 border-slate-300 rounded-xl shadow-xl hover:border-white pt-6 transition-all w-4/12 grid items-center justify-center">
        <div className="border-2 rounded-xl border-slate-200">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl text-black"
          />
          <div className="text-center py-2">
            <span className="text-black text-md">Dia de Recorte: {date?.toDateString()}</span>
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
});

BookingComponent.displayName = "BookingComponent";

const DetailsComponent = memo(({ setState }: { setState: (state: string) => void }) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the emailnotif API using axios
    axios.post("/api/emailnotif")
      .then((response: { data: any; }) => {
        // Handle the response
        console.log(response.data);
      })
      .catch((error: any) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-white grid items-center justify-center">
      <div className="border-2 border-slate-300 p-10 rounded-xl shadow-xl hover:border-white my-12 transition-all w-10/12 grid items-center justify-center">
        <form onSubmit={handleSubmit} className="grid gap-4 h-auto p-10 w-[30dvw]">
          <label className="label">name</label>
          <input
            type="text"
            id="name"
            className="input-custom pl-2 my-2"
            placeholder="name"
          />
          <label className="label">Email</label>
          <input
            className="input-custom pl-2 my-2"
            type="text"
            placeholder="email"
          />
          <label className="label">Phone</label>
          <input
            className="input-custom pl-2 my-2"
            type="text"
            placeholder="phone"
          />
          <label className="label">Address</label>
          <input
            className="input-custom pl-2 my-2"
            type="text"
            placeholder="address"
          />
          <label className="label">Corte</label>
          <select className="input-custom pl-2 my-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <label className="label">Silla</label>
          <select className="input-custom pl-2 my-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </form>
        <div className="w-full flex items-center justify-center py-6">
          <Button type="submit" onClick={() => setState("confirmation")} className="button">
            confirmation
          </Button>
        </div>
      </div>
    </div>
  );
});

DetailsComponent.displayName = "DetailsComponent";

const ConfirmationComponent = memo(() => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="border-4 hover:border-0 transition-all p-10 rounded-xl w-6/12 text-6xl font-bold text-black">
        Thank you for being a valued customer hope to see you soon
      </div>
    </div>
  );
});

ConfirmationComponent.displayName = "ConfirmationComponent";
