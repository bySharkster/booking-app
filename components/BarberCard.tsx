import { BellRing, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Scissors from "./icons/Scissors";

const barbers = [
  {
    name: "Saul Goodman",
    description: "Experto en cortes de cabello y barba.",
  },
  {
    name: "Saul Goodman",
    description: "Experto en cortes de cabello y barba.",
  },
  {
    name: "Saul Goodman",
    description: "Experto en cortes de cabello y barba.",
  },
  {
    name: "Saul Goodman",
    description: "Experto en cortes de cabello y barba.",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function BarberCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Available Barbers</CardTitle>
        <CardDescription>You have 5 options.</CardDescription>
      </CardHeader>
      <CardContent className="mx-auto gap-4">
        <div>
          {barbers.map((barber, index) => (
            <div
              key={index}
              className=" flex flex-row items-start py-4  last:bg-primary-foreground
              rounded-md
              border"
            >
              <div className=" flex items-center p-4 gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1">
                <div className="flex flex-row gap-2 items-start">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-yellow-500" />
                  <p className="text-sm font-medium leading-none">
                    {barber.name}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground pl-4">
                  {barber.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2">
          Next Step
          <Scissors className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
