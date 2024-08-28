"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";
import { E164Number } from "libphonenumber-js/core";

type PhoneNumberInputProps = {
  className?: string;
  value: E164Number | undefined;
  onChange: (value: E164Number | undefined) => void;
};

function PhoneNumberInput({ className, value, onChange }: PhoneNumberInputProps) {
  return (
    <PhoneInput
      className={cn("", className)}
      defaultCountry="PR"
      placeholder="Número teléfonico"
      value={value}
      onChange={onChange}
    />
  );
}

export default PhoneNumberInput;
