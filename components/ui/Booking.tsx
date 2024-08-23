"use client";

import React, { useMemo, memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

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

const BookingComponent = memo((setState: any) => {
  const handleClick = () => {
    setState("details");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="border-2 border-slate-300 rounded-xl shadow-xl hover:border-white pt-6 transition-all w-4/12 grid items-center justify-center">
        <div className="border-2 rounded-xl border-slate-200">
          <Calendar />
        </div>
        <div className="w-full flex items-center justify-center py-12">
          <Button onClick={(e) => handleClick()} className="button">
            Details
          </Button>
        </div>
      </div>
    </div>
  );
});

BookingComponent.displayName = "BookingComponent";

const DetailsComponent = memo((setState: any) => {
  return (
    <div className="min-h-screen bg-white grid items-center justify-center">
      <form className="grid gap-4 border-2 border-slate-300 h-auto p-10 bg-white w-[40dvw]">
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
      <div className="w-full flex items-center justify-center py-12">
        <Button onClick={() => setState("confirmation")} className="button">
          confirmation
        </Button>
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
