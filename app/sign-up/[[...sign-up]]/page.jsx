"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex flex-col items-center mt-35">
        <SignUp afterSignUpUrl="/dashboard"/>;
    </div>
  
    )
}