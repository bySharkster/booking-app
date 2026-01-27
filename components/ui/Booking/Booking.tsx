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
} from "../card";
import { cn } from "@/lib/utils";
import { Input } from "../input";
import { Label } from "../label";
import PhoneNumberInput from "../phoneNumberInput";
import BookingCard from "../bookingCard";
import { TimePicker } from "../timePicker";
import GoBackButton from "../goBack";
import { E164Number } from "libphonenumber-js/core";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Test } from "../Test/Test";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "../Loader/Loader";
import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId: "756308670580-d2dj05osqdql79isa8udjm6fnget117o.apps.googleusercontent.com",
  apiKey: "AIzaSyDVNZGmNYCzQxTbKHSb9WtjsNfZn6FWlEU",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);
// types for each component
type formDataProps = {
  name: string;
  email: string;
  phone: E164Number | undefined;
  address: string;
  corte: string;
  silla: number;
  reservationId: string;
};

type BookingProps = {
  setState: (state: string) => void;
  today: Date;
  tomorrow: Date;
  date: Date | undefined;
  time: string | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setTime: React.Dispatch<React.SetStateAction<string | undefined>>;
};

type DetailsProps = {
  setState: (state: string) => void;
  formData: formDataProps;
  setFormData: React.Dispatch<React.SetStateAction<formDataProps>>;
};

export const Booking = () => {
  const [state, setState] = useState("details");

  // moved date logic to the parent component to be able to use it in the confirmation component
  const today = useMemo(() => new Date(), []);
  const tomorrow: Date = useMemo(() => new Date(), []);
  const [date, setDate] = React.useState<Date | undefined>(tomorrow);
  const [time, setTime] = React.useState<string | undefined>(undefined);


  // moved formData up the tree to be able to use it in the confirmation component
  const [formData, setFormData] = useState<formDataProps>({
    name: "",
    email: "",
    phone: undefined,
    address: "",
    corte: "Recorte y Barba",
    silla: 0,
    reservationId: uuidv4(),
  });

  const renderComponent = useCallback(() => {
    switch (state) {
      case "details":
        return <DetailsComponent setState={setState} formData={formData} setFormData={setFormData} />;
      case "confirmation":
        return <Loader />;
      case "booking":
        return <BookingComponent setState={setState} today={today} tomorrow={tomorrow} date={date} time={time} setDate={setDate} setTime={setTime} />;
      case "test":
        return <Test />;
      default:
        return <BookingComponent setState={setState} today={today} tomorrow={tomorrow} date={date} time={time} setDate={setDate} setTime={setTime} />;
    }
  }, [state, formData, date, today, tomorrow, time]);

  return <div className="grid">{renderComponent()}</div>;
};

const BookingComponent = memo(({ setState, today, tomorrow, date, time, setDate, setTime }: BookingProps) => {

    tomorrow.setDate(today.getDate() + 1);

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
      <div className="flex gap-32">
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
      </div>
    );
  }
);

BookingComponent.displayName = "BookingComponent";

const DetailsComponent = memo(({ setState, formData, setFormData }: DetailsProps) => {

    const handleSubmit = async() => {
      // Call the emailnotif API using axios
      try {
        // use the google calendar api
        apiCalendar.createEvent({
          // summary: "Corte de Pelo",
          // description: `Corte: ${formData.corte} - Barbero: ${formData.silla}`,
          start: {
            dateTime: new Date().toISOString(),
            timeZone: "America/Puerto_Rico",
            },
          end: {
            dateTime: new Date().toISOString(),
            timeZone: "America/Puerto_Rico",
            },
        });

        // Send the reservationId to the emailnotif API
        // await axios.post("/api/Emailnotif", formData);
        // window.location.href = `/confirm/${formData.reservationId}`;
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
                    // window.location.href = `/confirm/${formData.reservationId}`;
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
