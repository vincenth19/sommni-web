import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { customerAccessTokenCreate } from "../lib/shopify";
import { screenSizes, TCustomerUserError, TUserCred } from "../types";
import { useRouter } from "next/router";
import { encrypt } from "../lib/cryptojs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContextData } from "../AppContext";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const AlertCard = dynamic(() => import("../components/shared/alertCard"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));

const SignIn: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [loginError, setLoginError] = useState<TCustomerUserError[]>();

  const router = useRouter();

  const { setUser, setUsername } = useContextData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserCred>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TUserCred> = async (data) => {
    const token = await customerAccessTokenCreate(data);

    if (token.errors || token.length > 0) {
      setLoginError(token);
    } else {
      const encryptedToken = encrypt(token.accessToken);
      setCookie("login", encryptedToken, {
        path: "/",
        expires: new Date(token.expiresAt),
      });
      router.push("/profile");
    }
  };

  useEffect(() => {
    if (cookies.login) {
      router.push("/profile");
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies.login, router]);

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  return (
    <MainFrame>
      <PageHead title="Sign In - Sommni" />
      {!isLoggedIn && (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", padding: "4rem 0" }}
          >
            <Group direction="column" position="center">
              <h1 style={{ fontSize: "3rem" }}>Sign In</h1>
              <Group>
                <Link href={"/sign-up"} passHref>
                  <Button component="a" variant="subtle">
                    Sign up instead
                  </Button>
                </Link>
                <Link href={"/forgot-password"} passHref>
                  <Button component="a" variant="subtle">
                    Forgot Password?
                  </Button>
                </Link>
              </Group>
              {loginError && (
                <AlertCard
                  errors={loginError}
                  title="Your credentials might be incorrect. Try again."
                />
              )}
              <TextInput
                label="Email"
                required
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please enter valid email",
                  },
                })}
                error={errors.email && errors.email.message}
                style={{ width: isScreenBig ? "50%" : "100%" }}
              />

              <PasswordInput
                id="#input2"
                required
                label="Password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors.password && errors.password.message}
                style={{ width: isScreenBig ? "50%" : "100%" }}
              />
              <Button
                type="submit"
                title="Sign In"
                style={{ width: isScreenBig ? "50%" : "100%" }}
              >
                Sign In
              </Button>
            </Group>
          </form>
        </>
      )}
    </MainFrame>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default SignIn;
