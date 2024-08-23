import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        <Button asChild size="lg">
          <Link href="/barbers">Barbers</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/booking">Booking</Link>
        </Button>
      </div>
    </main>
  );
}
