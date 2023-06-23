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

    if (signin.data) {
      console.log(signin, "data");
      router.refresh();
    } else {
      console.log(signin, "err");
    }
  };

  const handleToggle = () => {
    updateSignUpToggle(!signUpToggle);
  };

  return (
    <div>
      <div className="w-1/2 mx-auto mt-32 text-white">
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
          <a
            onClick={() => {
              handleToggle();
            }}
          >
            {!signUpToggle
              ? "No account? Sign Up!"
              : "Have an account? Log In!"}
          </a>
          {signUp && <h1>Check your email for a confirmation link!</h1>}
        </div>
      </div>
    </div>
  );
}
