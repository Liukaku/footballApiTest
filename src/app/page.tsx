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
    if (!signUpToggle) {
      await signInHandler();
    } else {
      await signUpHandler();
    }
  };

  const signUpHandler = async () => {
    const signup = await supabase.auth.signUp({
      email: name,
      password: pss,
      options: {
        emailRedirectTo: `${location.origin}/fixtures`,
      },
    });

    if (signup.data) {
      updateError("");
      updateSignUp(true);
    } else {
      console.log(signup, "err");
    }
  };

  const signInHandler = async () => {
    const signin = await supabase.auth.signInWithPassword({
      email: name,
      password: pss,
    });

    if (!signin.error) {
      router.refresh();
    } else {
      updateError("Incorrect email or password");
    }
  };

  const handlerPasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reset = await supabase.auth.resetPasswordForEmail(name, {
      redirectTo: `${location.origin}/reset`,
    });

    console.log(reset);
    updateError("A reset link has been sent to your email");
  };

  const handleToggle = () => {
    updateSignUpToggle(!signUpToggle);
  };

  return (
    <div className=" min-h-screen backdrop-blur-md">
      <div className="w-1/2 mx-auto pt-32 text-white">
        <div>
          {!reset ? (
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
          ) : (
            <form
              className="text-black flex flex-wrap"
              onSubmit={(e) => {
                handlerPasswordReset(e);
              }}
            >
              <h3 className="w-full text-xl mb-1 text-white">Login</h3>
              <input
                className="w-full mb-5"
                type="text"
                onChange={(e) => updateName(e.target.value)}
              ></input>
              <button
                className="w-1/3 mx-auto border-white border mt-5 text-white"
                type="submit"
              >
                Reset Password
              </button>
            </form>
          )}
          <div className="w-full">
            <button
              className=" cursor-pointer"
              onClick={() => {
                handleToggle();
              }}
            >
              {!signUpToggle
                ? "No account? Sign Up!"
                : "Have an account? Log In!"}
            </button>
          </div>
          <div className="w-full">
            <button
              className="cursor-pointer"
              onClick={() => {
                toggleReset(!reset);
              }}
            >
              {reset ? "Back to login" : "Forgot Password?"}
            </button>
          </div>
          {signUp && (
            <div className="font-bold text-lg mt-5 bg-cyan-950/70 rounded-md border border-white/30 text-center shadow-md shadow-black/50">
              <h1 className=" ">Check your email for a confirmation link!</h1>
              <h5 className="font-md text-sm my-1">
                If you don't see it, check your spam folder or click the button
                to reset your password
              </h5>
            </div>
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
