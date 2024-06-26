"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth, useSignUp, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type User = {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
};

const SignUpPage = () => {
  // Getting router query if any (Join the community)
  const searchParams = useSearchParams();

  // Below error
  const [bError, setBError] = useState("");

  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState(searchParams.get("email"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const { user } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (user) {
    router.push("/dashboard");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) return;

    // User description
    const user: User = {
      first_name: firstName,
      last_name: lastName,
      email_address: email!,
      password: password,
    };

    await signUp
      ?.create(user)
      .then(async (result) => {
        // Send email
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // Change UI
        setPendingVerification(true);
      })
      .catch((err) => {
        setBError(err.errors[0].longMessage);
      });
  };

  // Verify User Email Code
  const onPressVerify = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    await signUp
      .attemptEmailAddressVerification({
        code,
      })
      .then(async (completeSignUp) => {
        if (completeSignUp.status !== "complete") {
          /* Investigate the response, to see if there was an error or if the user needs to complete one more step */
          console.log(JSON.stringify(completeSignUp, null, 2));
        }
        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        setBError(err.errors[0].longMessage);
      });
  };

  return (
    <div className="container relative flex pt-5 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <img src="/logo.jpg" className="md:h-20 md:w-20 h-14 w-14 rounded-full" />
          <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <Card className="mx-auto md:w-[400px] w-[300px] h-[550px]">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Start your jouney to have good relations with your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="my-8" onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email" className="text-left">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="text" className="text-left">
                        Username
                      </Label>
                      <Input
                        id="username"
                        placeholder="user_name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password" className="text-left">
                        Password
                      </Label>
                      <Input
                        id="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password-verify" className="text-left">
                        Verify Password
                      </Label>
                      <Input
                        id="password-verify"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <CardFooter className="flex justify-center mt-8">
                    <Button variant="outline">Sign Up</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
