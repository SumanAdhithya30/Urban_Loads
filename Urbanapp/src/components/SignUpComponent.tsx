import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpComponent = () => {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          footerActionLink: "text-blue-600 hover:text-blue-700",
          card: "bg-white shadow-md rounded-lg",
        },
      }}
    />
  );
};

export default SignUpComponent;
