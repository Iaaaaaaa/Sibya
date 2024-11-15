"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Logo from "./Logo";
import { Montserrat } from "next/font/google";
import { Poppins } from "next/font/google";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function SignInPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-white">
      <div className="flex flex-grow mt-10">
        <div className="flex bg-white rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] gap-5 ml-52 max-md:flex-col max-h-[800px] max-md:max-w-full">
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
          <SignIn.Root>
            <SignIn.Step
              name="start"
              className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-[750px] sm:px-8"
            >
              <Clerk.GlobalError className="block text-sm text-red-600" />

              <Clerk.Field className="ml-10" name="identifier">
                <h1
                  className={`${montserrat.className} mt-20
                  text-2xl
                  text-green-900`}
                >
                  Glad You're Back!
                </h1>
                <Clerk.Label className="sr-only">Email</Clerk.Label>
                <Clerk.Input
                  type="email"
                  required
                  placeholder="CarSu Email"
                  className={`${poppins.className} w-[587px] h-[61px] border-2 mt-12 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3 text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                />
                <Clerk.FieldError className="block mt-2 text-xs text-red-600" />
                <Clerk.Field name="password" className="space-y-3">
                  <Clerk.Input
                    type="password"
                    required
                    placeholder="Password"
                    className={`${poppins.className} w-[587px] h-[61px] border-2 mt-3 rounded-lg border-black bg-white pb-2 text-sm/6 indent-3  text-neutral-950 outline-none placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600`}
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </Clerk.Field>
              <SignIn.Action
                submit
                className={`${poppins.className}relative w-[95px] rounded-md ml-72 h-[45px] bg-green-700  py-1.5 text-sm font-medium text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600  before:rounded-md before:bg-white/10 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 `}
              >
                Log In
              </SignIn.Action>
              <p className="ml-56 text-sm font-bold text-black">
                Don&apos;t have an account?{" "}
                <Clerk.Link
                  navigate="sign-up"
                  className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-300 bg-neutral-100 focus-visible:bg-neutral-100"
                >
                  Sign up
                </Clerk.Link>
              </p>
              <p className="text-sm font-bold text-black ml-[265px] ">
                or{" "}
                <Clerk.Link
                  navigate="sign-up"
                  className="rounded px-1 py-0.5 text-black outline-none hover:bg-neutral-300 bg-neutral-100 focus-visible:bg-neutral-100"
                >
                  Log in
                </Clerk.Link>{" "}
                as Guest{" "}
              </p>
            </SignIn.Step>
            <SignIn.Step
              name="verifications"
              className="w-full px-4 py-10 space-y-6 rounded-2xl sm:w-96 sm:px-8"
            >
              <SignIn.Strategy name="email_code">
                <header className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 40 40"
                    className="mx-auto size-10"
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
                    <g fill="#0A0A0A" mask="url(#a)">
                      <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                      <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                    </g>
                  </svg>
                  <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                    Verify email code
                  </h1>
                </header>
                <Clerk.GlobalError className="block text-sm text-red-600" />
                <Clerk.Field name="code">
                  <Clerk.Label className="sr-only">Email code</Clerk.Label>
                  <Clerk.Input
                    type="otp"
                    required
                    placeholder="Email code"
                    className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
                  />
                  <Clerk.FieldError className="block mt-2 text-xs text-red-600" />
                </Clerk.Field>
                <SignIn.Action
                  submit
                  className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
                >
                  Continue
                </SignIn.Action>
              </SignIn.Strategy>
              <SignIn.Strategy name="phone_code">
                <header className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 40 40"
                    className="mx-auto size-10"
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
                    <g fill="#0A0A0A" mask="url(#a)">
                      <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                      <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                    </g>
                  </svg>
                  <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                    Verify phone code
                  </h1>
                </header>
                <Clerk.GlobalError className="block text-sm text-red-600" />
                <Clerk.Field name="code">
                  <Clerk.Label className="sr-only">Phone code</Clerk.Label>
                  <Clerk.Input
                    type="otp"
                    required
                    placeholder="Phone code"
                    className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
                  />
                  <Clerk.FieldError className="block mt-2 text-xs text-red-600" />
                </Clerk.Field>
                <SignIn.Action
                  submit
                  className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
                >
                  Login
                </SignIn.Action>
              </SignIn.Strategy>
              <p className="text-sm text-center text-neutral-500">
                Don&apos;t have an account?{" "}
                <Clerk.Link
                  navigate="sign-up"
                  className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
                >
                  Sign up
                </Clerk.Link>
              </p>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
    </main>
  );
}
