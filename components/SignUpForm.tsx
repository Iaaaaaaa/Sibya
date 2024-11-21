"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import * as Clerk from "@clerk/elements/common";
import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function SignUpForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const [validationErrors, setValidationErrors] = React.useState<{
    [key: string]: string;
  }>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required.";
    }
    const regex = /^[a-zA-Z0-9._%+-]+@carsu\.edu\.ph$/;
    if (!regex.test(email)) {
      return "Please use a CarSu email (@carsu.edu.ph).";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);
    setValidationErrors({
      email: validateEmail(email),
      password: validatePassword(password),
    });

    if (validationErrors.email || validationErrors.password) {
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        router.push("/");
      } else {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2
        className={`${montserrat.className} text-2xl font-bold text-[#094005] text-center sm:text-left`}
      >
        Sign In
      </h2>
      <div>
        <Clerk.Field name="emailAddress">
          <Clerk.Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidationErrors({
                ...validationErrors,
                email: validateEmail(e.target.value),
              });
            }}
            required
            placeholder="CarSu Email"
            className={`${poppins.className} w-full border-2 border-black rounded-lg px-3 py-2 pb-2 text-sm/6 indent-3 text-neutral-950 placeholder:text-black focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
          />
        </Clerk.Field>
        {validationErrors.email && (
          <div className="text-red-600 text-sm mt-1">
            {validationErrors.email}
          </div>
        )}
      </div>

      <div>
        <Clerk.Field name="password">
          <Clerk.Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors({
                ...validationErrors,
                password: validatePassword(e.target.value),
              });
            }}
            required
            placeholder="Password"
            className={`${poppins.className} w-full border-2 border-black rounded-lg px-3 py-2 pb-2 text-sm/6 indent-3 text-neutral-950 placeholder:text-black focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600 outline-none`}
          />
        </Clerk.Field>
        {validationErrors.password && (
          <div className="text-red-600 text-sm mt-1">
            {validationErrors.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!!validationErrors.email || !!validationErrors.password}
        className="w-full py-2 text-lg font-semibold text-white bg-[#34802E] rounded-lg hover:bg-green-800 disabled:opacity-50"
      >
        Sign in
      </button>

      {errors.length > 0 && (
        <ul className="text-red-600 text-sm">
          {errors.map((el, index) => (
            <li key={index}>{el.longMessage}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
