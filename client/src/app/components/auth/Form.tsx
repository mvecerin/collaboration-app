import React from "react";
import { Toaster } from "react-hot-toast";
import { IconWithText } from "../other/IconWithText";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const Form = (props: { formType: string }) => (
  <main className="pt-5">
    <Toaster />
    <h1 className="text-center h2 pb-3">
      <IconWithText text="Chat app" icon="chat-dots" />
    </h1>
    {props.formType === "signIn" ? <SignInForm /> : <SignUpForm />}
  </main>
);
