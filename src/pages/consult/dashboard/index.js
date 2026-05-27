import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/consult/dashboard/overview");
  }, []);

  return null;
}
