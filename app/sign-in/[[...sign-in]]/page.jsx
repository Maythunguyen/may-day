"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {

  return (
    <div className="mx-auto flex flex-col items-center mt-35">
        <SignIn afterSignInUrl="/dashboard"/>;
    </div>
  
    )
}