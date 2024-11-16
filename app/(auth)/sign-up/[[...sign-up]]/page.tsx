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
                  <Clerk.Field name="firstName">
                    <Clerk.Label className="sr-only">First Name</Clerk.Label>
                    <Clerk.Input
                      type="firstName"
                      required
                      placeholder="First Name"
                      className={`${poppins.className} w-[240px] h-[47px] border-2 mt-12 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                    />
                    <Clerk.FieldError />
                  </Clerk.Field>
                  <Clerk.Field name="lastName">
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

                <Clerk.Field name="emailAddress">
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
                  submit
                  className="w-[492px] h-[50px] mt-4 text-xl font-semibold text-white whitespace-nowrap bg-green-700 rounded-2xl max-md:px-5"
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
            <SignUp.Step
              name="verifications"
              className="w-full px-4 py-10 space-y-6 bg-white shadow-md rounded-2xl ring-1 ring-black/5 sm:w-96 sm:px-8"
            >
              <header className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                  className="mx-auto size-10 text-zinc-950"
                  aria-hidden
                >
                  <mask
                    id="a"
                    width="40"
                    height="40"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
                  </mask>
                  <g fill="currentColor" mask="url(#a)">
                    <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                    <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                  </g>
                </svg>
                <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
                  Verify email code
                </h1>
              </header>
              <Clerk.GlobalError className="block text-sm text-red-400" />
              <SignUp.Strategy name="email_code">
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-zinc-950">
                    Email code
                  </Clerk.Label>
                  <Clerk.Input
                    type="otp"
                    required
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
                <SignUp.Action
                  submit
                  className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                >
                  Verify
                </SignUp.Action>
              </SignUp.Strategy>
              <p className="text-sm text-center text-zinc-500">
                Already have an account?{" "}
                <Clerk.Link
                  navigate="sign-in"
                  className="font-medium outline-none text-zinc-950 decoration-zinc-950/20 underline-offset-4 hover:text-zinc-700 hover:underline focus-visible:underline"
                >
                  Sign in
                </Clerk.Link>
              </p>
            </SignUp.Step>
          </SignUp.Root>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
