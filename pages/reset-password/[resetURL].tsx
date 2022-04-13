import { Button, Group, PasswordInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { ecrypt } from "../../lib/cryptojs";
import { customerResetByUrl } from "../../lib/shopify";
import { screenSizes } from "../../types";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../../components/shared/mainFrame"));
const AlertCard = dynamic(() => import("../../components/shared/alertCard"));
const Loading = dynamic(() => import("../../components/shared/loading"));

type TFormInput = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCookie, setHasCookie] = useState<boolean | null>(null);
  const [updateError, setUpdateError] = useState();
  const [resetUrl, setResetUrl] = useState<string>("");

  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TFormInput>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    const res = await customerResetByUrl(data.password, resetUrl);
    if (res.errors || Array.isArray(res)) {
      setUpdateError(res);
    } else {
      hasCookie && removeCookie("login", { path: "/" });
      const encryptedToken = ecrypt(res.accessToken);
      setCookie("login", encryptedToken, {
        path: "/",
        expires: new Date(res.expiresAt),
      });
      router.push("/profile");
    }
  };

  useEffect(() => {
    console.log("a", router.query);
    if (!router.query[""]) {
      router.push("/");
    } else {
      if (!Array.isArray(router.query[""])) {
        setResetUrl(router.query[""]);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  useEffect(() => {
    if (cookies.login) {
      setHasCookie(true);
    } else {
      setHasCookie(false);
    }
  }, [cookies.login]);

  return (
    <MainFrame>
      {isLoading ? (
        <Loading text="Checking..." />
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", padding: "8rem 0" }}
          >
            <Group direction="column" position="center" spacing={"xl"}>
              <h1 style={{ fontSize: "3rem" }}>Reset Password</h1>
              {updateError && <AlertCard errors={updateError} />}
              <PasswordInput
                required
                id="pwd"
                label="New Password"
                style={{ width: isScreenBig ? "50%" : "100%" }}
                {...register("password", {
                  required: "You must enter your new password",
                  minLength: {
                    value: 8,
                    message: "Minimum password is 8 characters",
                  },
                })}
                error={errors.password && errors.password.message}
              />

              <PasswordInput
                required
                id="confirmPwd"
                label="Confirm Password"
                style={{ width: isScreenBig ? "50%" : "100%" }}
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === getValues("password") ||
                    "The passwords do not match",
                })}
                error={errors.confirmPassword && errors.confirmPassword.message}
              />
              <Button
                style={{ width: isScreenBig ? "50%" : "100%" }}
                fullWidth
                type="submit"
                title="Reset Password"
              >
                Reset Password
              </Button>
            </Group>
          </form>
        </>
      )}
    </MainFrame>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default ResetPassword;
