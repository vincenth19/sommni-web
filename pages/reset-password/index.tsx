import { useRouter } from "next/router";
import { useEffect } from "react";

const ResetPasswordIndex = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return <></>;
};

export default ResetPasswordIndex;
