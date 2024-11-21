"use client";

import React from "react";
import Logo from "./Logo";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import { Montserrat, Poppins } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const SignInPage: React.FC = () => {
  return (
    <main className="flex flex-col justify-center w-full min-h-screen px-5 overflow-hidden bg-white sm:px-10">
      <div className="flex justify-center flex-grow mt-10">
        <div className="flex bg-white rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] gap-5  max-md:flex-col max-h-[700px] max-md:max-w-full sm:w-[90%] lg:w-[70%]">
          <section
            className="w-full h-56 bg-center bg-cover rounded-lg sm:w-[450px] sm:h-auto"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/097e29cdb461256914f24e948fd0d5df90bbe698a523ae882bff1f9787a8aa02?apiKey=69d26e7d3134467f9c216eb5f38b89f7&')",
            }}
          >
            <div className="relative z-10 flex flex-col h-full p-5 text-white">
              <Logo />
              <div className="flex flex-col max-w-md ">
                <h1
                  className={`${montserrat.className} text-xl sm:text-2xl font-extrabold leading-tight`}
                >
                  Stay{" "}
                  <span className="italic">
                    Informed,
                    <br />
                  </span>{" "}
                  Stay <span className="italic">Engaged.</span>
                </h1>
                <p className={`${poppins.className} text-sm sm:text-base`}>
                  Sibya: Caraga State University Event Hub
                </p>
              </div>
            </div>
          </section>

          <SignIn.Root>
            <SignIn.Step
              className="w-full sm:w-[450px] px-4 py-6 space-y-6 sm:px-8 bg-white rounded-lg mt-24"
              name="start"
            >
              <h2
                className={`${montserrat.className} text-2xl font-bold text-[#094005] text-center sm:text-left`}
              >
                Glad You're Back!
              </h2>
              <div className="flex flex-col gap-3">
                <Clerk.Field name="identifier">
                  <Clerk.Input
                    type="email"
                    required
                    placeholder="CarSu Email"
                    className={`${poppins.className} w-full  border-2 border-black rounded-lg px-3 py-2  pb-2 text-sm/6 indent-3 text-neutral-950  placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
                  />
                </Clerk.Field>

                <Clerk.Field name="password">
                  <Clerk.Input
                    type="password"
                    required
                    placeholder="Password"
                    className={`${poppins.className} w-full border-2 border-black rounded-lg px-3 py-2 pb-2 text-sm/6 indent-3 text-neutral-950  placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
                  />
                </Clerk.Field>

                <SignIn.Action
                  submit
                  className="w-full py-2 text-lg font-semibold text-white bg-[#34802E] rounded-lg hover:bg-green-800"
                >
                  Log In
                </SignIn.Action>

                <p className="text-sm text-center">
                  Don&apos;t have an account?{" "}
                  <Clerk.Link
                    navigate="sign-up"
                    className="text-green-700 hover:underline"
                  >
                    Sign Up
                  </Clerk.Link>
                </p>
                <p className="text-sm text-center">
                  or{" "}
                  <Link href="/" className="text-green-700 hover:underline">
                    Log in as Guest
                  </Link>
                </p>
              </div>
            </SignIn.Step>
            <SignIn.Step
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
                <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                  Verify email code
                </h1>
              </header>
              <Clerk.Field name="code">
                <Clerk.Input
                  type="otp"
                  required
                  placeholder="Email code"
                  className="w-full pb-2 text-sm bg-white border-b outline-none border-neutral-200 text-neutral-950 placeholder:text-neutral-400"
                />
              </Clerk.Field>
              <SignIn.Action
                submit
                className="w-full py-2 text-lg font-semibold text-white bg-[#34802E] rounded-lg hover:bg-green-800"
              >
                Continue
              </SignIn.Action>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
