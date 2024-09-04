import MaxMainWidth from "@/components/MaxMainRegion";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <MaxMainWidth>
      <main className="flex flex-col items-center lg:p-24 md:p-12 sm:p-8 p-2 pt-24">
        <h1 className="font-bold text-5xl">Hi People!</h1>
        <br />
        <p className="text-gray-500 text-xl text-center">
          Relationz enables businesses to cultivate strong relationships with
          their customers, thereby enhancing customer satisfaction and driving
          business growth.
        </p>
        <br/>
        {user ? null : (
        <Button asChild>
          <Link href="/sign-up" className="text-lg font-bold">
            Let&apos;s start <ArrowRight className="ml-2 h-5 w-5"/>
          </Link>
        </Button> )}
        <br/>
        <img src="/crm-start-page.png" className="w-10/12 h-auto"/>
      </main>
    </MaxMainWidth>
  );
}
