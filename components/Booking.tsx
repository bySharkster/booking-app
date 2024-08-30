"use client";

import React, { useMemo, memo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import PhoneNumberInput from "./ui/phoneNumberInput";
import BookingCard from "./ui/bookingCard";
import { TimePicker } from "./ui/timePicker";
import GoBackButton from "./ui/goBack";
import { E164Number } from "libphonenumber-js/core";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Test } from "./ui/Test/Test";

type formDataProps = {
  name: string;
  email: string;
  phone: E164Number | undefined;
  address: string;
  corte: string;
  silla: number;
};

export const Booking = () => {
  const [state, setState] = useState("booking");
  const renderComponent = useCallback(() => {
    switch (state) {
      case "details":
        return <DetailsComponent setState={setState} />;
      case "confirmation":
        return <ConfirmationComponent />;
      case "booking":
        return <BookingComponent setState={setState} />;
      case "test":
        return <Test />;
      default:
        return <BookingComponent setState={setState} />;
    }
  }, [state]);

  return <div className="grid">{renderComponent()}</div>;
};

const BookingComponent = memo(
  ({ setState }: { setState: (state: string) => void }) => {
    const today = new Date();
    const tomorrow: Date = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const [date, setDate] = React.useState<Date | undefined>(tomorrow);
    const [time, setTime] = React.useState<string | undefined>(undefined);
    const { toast } = useToast();

    const handleSelectTime = (time: string) => {
      setTime(time);
    };

    const handleClick = () => {
      // TODO - Handle the date
      // Date Handles correctly fix timePicker component since have to press twice time button to actually select the time
      if (time !== undefined) {
        setState("details");
        toast({
          title: "Scheduled: Catch up ",
          description: `${date?.toLocaleTimeString()} - ${date?.toLocaleDateString()}`,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Please select a time",
        });
      }
    };

    return (
      <BookingCard>
        <CardHeader className="w-full mx-auto px-1 justify-center items-center">
          <CardTitle>Selecciona una fecha</CardTitle>
          <CardDescription className="md:max-w-fit p-1 w-60">
            Tan facil como presionar un dia en el calendario!
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-fit mx-auto justify-center items-center px-0 md:px-2">
          <section className="border-2 rounded-xl border-slate-200 bg-card-foreground items-center flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="text-input"
              />
              <TimePicker
                selected={date}
                onSelect={setDate}
                onSelectTime={handleSelectTime}
              />
            </div>
          </section>
          <div className="w-full flex items-center justify-center py-6">
            <Button
              onClick={(e) => handleClick()}
              className="button scale-95 hover:scale-105 duration-200 ease-in-out flex-1"
            >
              Details
            </Button>
          </div>
        </CardContent>
      </BookingCard>
    );
  }
);

BookingComponent.displayName = "BookingComponent";

const DetailsComponent = memo(({ setState }: { setState: (state: string) => void }) => {
  const [formData, setFormData] = useState<formDataProps>({
    name: "",
    email: "",
    phone: undefined,
    address: "",
    corte: "Recorte y Barba",
    silla: 0,
  });

  const handleSubmit = async() => {
    // Call the emailnotif API using axios
    try {
      await axios.post("/api/Emailnotif", formData);
    } catch (error) {
      console.error(error);
    }
  };

    return (
      <BookingCard>
        <CardHeader className="w-full mx-auto px-1 justify-center items-center">
          <CardTitle>Llena tu informacion!</CardTitle>
          <CardDescription className="md:max-w-fit p-1 w-60">
            Para que podamos atenderte mejor!
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full max-w-fit mx-auto px-1">
          <section className="border-2 rounded-xl border-slate-200 bg-card-foreground items-center flex flex-col justify-center">
            <div
              // onSubmit={handleSubmit}
              className="flex flex-col gap-4 h-auto p-4 md:p-10 w-full bg-card-foreground overflow-hidden rounded-xl"
            >
              <div className="flex flex-row items-baseline gap-1 ">
                {/* <label className="label flex-shrink">Name</label> */}
                <Input
                  type="text"
                  id="name"
                  placeholder="nombre"
                  required
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-row items-baseline gap-1 ">
                {/* <label className="label flex-shrink">Email</label> */}
                <Input
                  type="email"
                  id="email"
                  placeholder="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="flex flex-row items-baseline gap-1 ">
                {/* <label className="label flex-shrink">Phone</label> */}
                <PhoneNumberInput
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e })}
                />
              </div>
              {/* This could be for barbers or home services
            also it can be the location of the shop*/}
              {/* <label className="label">Address</label>
            <input
              className="input-custom text-input pl-2 my-2"
              type="text"
              placeholder="address"
            /> */}
              <div className="flex flex-col items-baseline gap-1 ">
                <Label className="label flex-shrink">Corte</Label>
                <select
                 onChange={(e) => setFormData({ ...formData, corte: e.target.value })}
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  flex-grow"
                >
                  <option
                    value={"Recorte y Barba"}
                  >
                    Recorte y Barba
                  </option>
                  <hr />
                  <option value={"Refinado"}>Refinado</option>
                  <option value={"Solo Recorte"}>Solo Recorte</option>
                </select>
              </div>
              <div className="flex flex-col items-baseline gap-1 ">
                <Label className="label flex-shrink">Barbero</Label>
                <select
                  onChange={(e) => setFormData({ ...formData, silla: parseInt(e.target.value) })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
                >
                  <option value="n/a">Selecciona Uno</option>
                  <hr className=" bg-background/80" />
                  <option value={"1"}>1</option>
                  <option value={"2"}>2</option>
                  <option value={"3"}>3</option>
                </select>
              </div>
              <div className="w-full flex items-center justify-center py-6">
                <GoBackButton onClick={() => setState("booking")} />
                <Button
                  // type="submit"
                  onClick={() => {
                    handleSubmit();
                    setState("confirmation");
                  }}
                  className="button scale-95 hover:scale-105 duration-200 ease-in-out"
                >
                  confirmation
                </Button>
              </div>
            </div>
          </section>
        </CardContent>
      </BookingCard>
    );
  }
);

DetailsComponent.displayName = "DetailsComponent";

const ConfirmationComponent = memo(() => {
  return (
    <BookingCard>
      <div className="flex items-center justify-between w-full sm:w-4/5 md:max-w-lg max-w-80 mb-4 z-[2] md:px-4 px-1 pt-6 ">
        <div className="text-sm text-muted-foreground">
          <div>Reservation made</div>
          <div>Tomorrow, 10:00 AM</div>
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
    </BookingCard>
  );
});

ConfirmationComponent.displayName = "ConfirmationComponent";
