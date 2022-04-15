import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const PageHead = dynamic(() => import("../../components/shared/pageHead"));

const CheckoutIndex = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return (
    <>
      <PageHead title="Redirecting to Checkout Page" />
    </>
  );
};

export default CheckoutIndex;
