import React from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/consult/subscription");
  };
  return (
    <form className="space-y-5">
      <InputField
        label="Email"
        placeholder="consultant@example.com"
        type="email"
        variant="colored"
        required
      />

      <InputField
        label="Password"
        placeholder="Create a password"
        type="password"
        variant="colored"
        required
      />

      <InputField
        label="Confirm Password"
        placeholder="Re-enter password"
        type="password"
        variant="colored"
        required
      />

      <Button onClick={handleClick} className="gap-2" full variant="ghost">
        Crete an account
      </Button>
    </form>
  );
}

export default Register;
