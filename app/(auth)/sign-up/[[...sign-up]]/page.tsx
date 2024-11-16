"use client";

import Logo from "./Logo";
import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { Poppins } from "next/font/google";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const SignUpPage: React.FC = () => {
  return (
    <main className="flex flex-col w-full min-h-screen bg-white">
      <div className="flex justify-center flex-grow mt-10">
        <div className="flex bg-white rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] gap-5 justify-center max-md:flex-col max-h-[700px] max-md:max-w-full">
          <section
            className="w-[450px] h-auto relative bg-cover bg-center rounded-lg"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/097e29cdb461256914f24e948fd0d5df90bbe698a523ae882bff1f9787a8aa02?apiKey=69d26e7d3134467f9c216eb5f38b89f7&')",
            }}
          >
            <div className="absolute inset-0 "></div>
            <div className="relative z-10 flex flex-col h-full p-5">
              <Logo />
              <div className="flex flex-col max-w-md mb-20">
                <h1 className="text-2xl font-extrabold leading-tight text-white">
                  Stay{" "}
                  <span className="italic">
                    Informed,
                    <br />
                  </span>{" "}
                  Stay <span className="italic">Engaged.</span>
                </h1>
                <p className="text-white text-s">
                  Sibya: Caraga State University Event Hub
                </p>
              </div>
            </div>
          </section>

          <SignUp.Root>
            {/* First Step: Collect basic info */}
            <SignUp.Step
              className="w-full place-content-center space-y-6 rounded-2xl px-4 py-10 sm:w-[750px] sm:px-8"
              name="start"
            >
              <div className="ml-24">
                <h2
                  className={`${poppins.className} self-start text-3xl font-bold text-[#094005]`}
                >
                  Sign Up
                </h2>
                <div className="flex">
                  <Clerk.Field name="firstname">
                    <Clerk.Label className="sr-only">First Name</Clerk.Label>
                    <Clerk.Input
                      type="firstName"
                      required
                      placeholder="First Name"
                      className={`${poppins.className} w-[240px] h-[47px] border-2 mt-12 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                    />
                    <Clerk.FieldError />
                  </Clerk.Field>
                  <Clerk.Field name="lastname">
                    <Clerk.Label className="sr-only">Last Name</Clerk.Label>
                    <Clerk.Input
                      type="lastName"
                      required
                      placeholder="Last Name"
                      className={`${poppins.className} w-[240px] h-[47px] border-2 ml-3 mt-12 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                    />
                    <Clerk.FieldError />
                  </Clerk.Field>
                </div>
                <Clerk.Field name="role">
                  <Clerk.Label className="sr-only">role</Clerk.Label>
                  <Select>
                    <SelectTrigger className="w-[492px] h-[47px] border-2 mt-3 rounded-lg border-black bg-white pb-2 text-sm/6 outline-none placeholder:text-black">
                      <SelectValue placeholder="Select Affiliation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">
                        Student from Caraga State University
                      </SelectItem>
                      <SelectItem value="Faculty">
                        Faculty from Caraga State University
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Clerk.FieldError />
                </Clerk.Field>

                <Clerk.Field name="phone_number">
                  <Clerk.Label className="sr-only">Contact Number</Clerk.Label>
                  <Clerk.Input
                    type="number"
                    required
                    placeholder="Contact Number"
                    className={`${poppins.className} w-[492px] h-[47px] border-2 mt-3 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                  />
                  <Clerk.FieldError />
                </Clerk.Field>
                <Clerk.Field name="email">
                  <Clerk.Label className="sr-only">Email</Clerk.Label>
                  <Clerk.Input
                    type="email"
                    required
                    placeholder="CarSu Email"
                    className={`${poppins.className} w-[492px] h-[47px] border-2 mt-3 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                  />
                  <Clerk.FieldError className="block mt-2 text-xs text-red-600" />
                </Clerk.Field>
                <Clerk.Field name="password">
                  <Clerk.Label className="sr-only">Password</Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    placeholder="Password"
                    className={`${poppins.className} w-[492px] h-[47px] border-2 mt-3 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                  />
                  <Clerk.FieldError />
                </Clerk.Field>

                <SignUp.Action
                  className="w-[492px] h-[50px] mt-4 text-xl font-semibold text-white whitespace-nowrap bg-green-700 rounded-2xl max-md:px-5"
                  submit
                >
                  Register
                </SignUp.Action>

                <p className="mt-3 text-sm font-bold text-black ml-36">
                  Already have an account?{" "}
                  <Clerk.Link
                    navigate="sign-in"
                    className={`${poppins.className} rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-300 bg-neutral-100 focus-visible:bg-neutral-100`}
                  >
                    Log in
                  </Clerk.Link>
                </p>
                <p className="text-sm mt-3 font-bold text-black ml-[190px] ">
                  or{" "}
                  <Clerk.Link
                    navigate="sign-up"
                    className="rounded px-1 py-0.5 text-black outline-none hover:bg-neutral-300 bg-neutral-100 focus-visible:bg-neutral-100"
                  >
                    Log in
                  </Clerk.Link>{" "}
                  as Guest{" "}
                </p>
              </div>
            </SignUp.Step>
            {/* Second Step: Email verification */}
            <SignUp.Step name="verifications">
              <header className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <g>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z"
                    />
                  </g>
                </svg>
                <p className="mb-5 text-xs font-bold text-center text-black">
                  Enter your email to verify your account
                </p>
              </header>
              <Clerk.Field name="email_code">
                <Clerk.Label className="sr-only">Email Code</Clerk.Label>
                <Clerk.Input
                  type="email_code"
                  required
                  placeholder="Verification code"
                  className="h-[50px] border-2 mt-3 w-[492px] rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
                  onChange={(e) =>
                    console.log("Verification Code: ", e.target.value)
                  }
                />
                <Clerk.FieldError />
              </Clerk.Field>
            </SignUp.Step>
          </SignUp.Root>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
