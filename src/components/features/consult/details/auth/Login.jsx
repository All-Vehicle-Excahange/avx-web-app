import React from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

function Login() {
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
        placeholder="Enter your password"
        type="password"
        variant="colored"
        required
      />

      {/* OPTIONS */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-third cursor-pointer">
          <input type="checkbox" className="accent-current" />
          Remember me
        </label>

        <span className="text-primary cursor-pointer hover:underline">
          Forgot password?
        </span>
      </div>

      {/* BUTTON */}
      <Button onClick={handleClick} className="gap-2" full variant="ghost">
        Login
      </Button>
    </form>
  );
}

export default Login;
