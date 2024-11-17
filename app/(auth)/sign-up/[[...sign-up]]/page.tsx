"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";
import { Montserrat, Poppins } from "next/font/google";
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
  // Manage role state
  const [role, setRole] = useState("");

  // Handle role selection
  const handleRoleChange = (value: string) => {
    setRole(value);
  };

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

          <SignUp.Root>
            <SignUp.Step
              className="w-full sm:w-[450px] px-4 py-6 space-y-6 sm:px-8 bg-white rounded-lg mt-24"
              name="start"
            >
              <h2
                className={`${montserrat.className} text-2xl font-bold text-[#094005] text-center sm:text-left`}
              >
                Sign Up
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Clerk.Field name="firstName">
                    <Clerk.Input
                      type="text"
                      required
                      placeholder="First Name"
                      className={`${poppins.className} w-full  border-2 border-black rounded-lg px-3 py-2  pb-2 text-sm/6 indent-3 text-neutral-950  placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
                    />
                  </Clerk.Field>
                  <Clerk.Field name="lastName">
                    <Clerk.Input
                      type="text"
                      required
                      placeholder="Last Name"
                      className={`${poppins.className} w-full  border-2 border-black rounded-lg px-3 py-2  pb-2 text-sm/6 indent-3 text-neutral-950  placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
                    />
                  </Clerk.Field>
                </div>

                <Clerk.Field name="role">
                  <Clerk.Label className="sr-only">Role</Clerk.Label>
                  <Select onValueChange={handleRoleChange}>
                    <SelectTrigger
                      className={`${poppins.className} w-full border-2 rounded-lg border-black bg-white pb-2 text-sm/6 outline-none placeholder:text-black`}
                    >
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
                </Clerk.Field>

                <Clerk.Field name="emailAddress">
                  <Clerk.Input
                    type="email"
                    required
                    placeholder="CarSu Email"
                    className={`${poppins.className} w-full border-2 border-black rounded-lg px-3 py-2  pb-2 text-sm/6 indent-3 text-neutral-950  placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
                  />
                </Clerk.Field>

                <Clerk.Field name="password">
                  <Clerk.Input
                    type="password"
                    required
                    placeholder="Password"
                    className={`${poppins.className} w-full  border-2 border-black rounded-lg px-3 py-2  pb-2 text-sm/6 indent-3 text-neutral-950  placeholder:text-black  focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
                  />
                </Clerk.Field>

                <SignUp.Action
                  submit
                  className="w-full py-2 text-lg font-semibold text-white bg-[#34802E] rounded-lg hover:bg-green-800"
                >
                  Register
                </SignUp.Action>

                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Clerk.Link
                    navigate="sign-in"
                    className="text-green-700 hover:underline"
                  >
                    Log in
                  </Clerk.Link>
                </p>
                <p className="text-sm text-center">
                  or{" "}
                  <Clerk.Link
                    navigate="sign-up"
                    className="text-green-700 hover:underline"
                  >
                    Log in as Guest
                  </Clerk.Link>
                </p>
              </div>
            </SignUp.Step>
          </SignUp.Root>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
