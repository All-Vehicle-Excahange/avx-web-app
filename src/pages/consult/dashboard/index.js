import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/consult/dashboard/overview");
  }, []);

  return null;
}
