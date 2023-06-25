"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, use, useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { sign } from "crypto";
import Link from "next/link";

const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export default function Home() {
  const router = useRouter();
  const [name, updateName] = useState<string>("");
  const [pss, updatePss] = useState<string>("");
  const [signUp, updateSignUp] = useState<boolean>(false);
  const [signUpToggle, updateSignUpToggle] = useState<boolean>(false);
  const [error, updateError] = useState<string>("");
  const [reset, toggleReset] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pss.length < 6) {
      updateError("Your password must be at least 6 characters long");
      return;
    }

    const signup = await supabase.auth.updateUser({
      email: name,
      password: pss,
    });

    if (!signup.error) {
      router.push("/fixtures");
    } else {
      console.log(signup, "err");
      if (signup.error.message === "Auth session missing!") {
        updateError("Reset link expired, please request a new one");
      }
      updateError("There has been an issue, please try again later");
    }
  };

  return (
    <div className=" min-h-screen backdrop-blur-md">
      <div className="w-1/2 mx-auto pt-32 text-white">
        <div>
          <form
            className="text-black flex flex-wrap"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h3 className="w-full text-xl mb-1 text-white">Login</h3>
            <input
              className="w-full mb-5"
              type="text"
              onChange={(e) => updateName(e.target.value)}
            ></input>
            <h3 className="w-full text-xl mb-1 text-white">Password</h3>
            <input
              className="w-full "
              type="password"
              onChange={(e) => updatePss(e.target.value)}
            ></input>
            <button
              className="w-1/3 mx-auto border-white border mt-5 text-white"
              type="submit"
            >
              {!signUpToggle ? "Login" : "Sign Up"}
            </button>
          </form>
          <Link href={"/"}>Back to login</Link>
          {pss.length < 6 && (
            <h1 className="mt-5 text-center">
              Your password must be at least 6 characters long
            </h1>
          )}

          {error && (
            <h1 className=" font-black text-xl mt-5 bg-red-400/30 rounded-md border border-white/30 text-center shadow-md shadow-black/50">
              {error}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
