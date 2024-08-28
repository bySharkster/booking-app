"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";
import { cn } from "@/lib/utils";

function PhoneNumberInput({ className }: { className: string }) {
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();

  return (
    <PhoneInput
      className={cn("", className)}
      defaultCountry="PR"
      placeholder="Número teléfonico"
      value={phoneNumber}
      onChange={setPhoneNumber}
    />
  );
}

export default PhoneNumberInput;
