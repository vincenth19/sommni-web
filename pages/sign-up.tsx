import { GetStaticProps, NextPage } from "next";
import {
  Button,
  Text,
  Group,
  PasswordInput,
  TextInput,
  useMantineTheme,
  Alert,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  screenSizes,
  TCustomerUserError,
  TInputCustomerCreate,
} from "../types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { customerCreate } from "../lib/shopify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiCheckboxCircleLine } from "react-icons/ri";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const AlertCard = dynamic(() => import("../components/shared/alertCard"));

const SignUp: NextPage = () => {
  const themes = useMantineTheme();
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();
  const [signUpError, setSignUpError] = useState<TCustomerUserError[]>();
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [checkPassword, setCheckpassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInputCustomerCreate>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptsMarketing: true,
    },
  });

  const onSubmit: SubmitHandler<TInputCustomerCreate> = async (data) => {
    const res = await customerCreate(data);

    if (res.errors || res.length > 0) {
      setSignUpError(res);
    } else {
      setSignUpSuccess(true);
    }
  };

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  useEffect(() => {
    setCheckpassword(watch("password"));
  }, [watch("password"), watch]);

  return (
    <MainFrame>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", padding: "4rem 0" }}
      >
        <Group direction="column" position="center">
          <h1 style={{ fontSize: "3rem" }}>Sign Up</h1>
          <Link href={"/sign-in"} passHref>
            <Button component="a" variant="subtle">
              Sign in instead
            </Button>
          </Link>
          {signUpSuccess && (
            <Alert
              style={{ width: isScreenBig ? "50%" : "100%" }}
              color="teal"
              title="Sign Up Successful"
            >
              <Group direction="column">
                <Text>You can sign in now </Text>
                <Link href={"/sign-in"} passHref>
                  <Button fullWidth component="a" compact color="teal">
                    Sign In
                  </Button>
                </Link>
              </Group>
            </Alert>
          )}
          {signUpError && <AlertCard errors={signUpError} />}
          <TextInput
            id="#firstName"
            label="First Name"
            required
            placeholder="John"
            {...register("firstName", { required: "First name is required" })}
            error={errors.firstName && errors.firstName.message}
            style={{ width: isScreenBig ? "50%" : "100%" }}
          />
          <TextInput
            id="#lastName"
            label="Last Name"
            required
            placeholder="Doe"
            {...register("lastName", { required: "Last name is required" })}
            error={errors.lastName && errors.lastName.message}
            style={{ width: isScreenBig ? "50%" : "100%" }}
          />
          <TextInput
            id="#email"
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
            id="#pwd"
            required
            label="Password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum length is 8" },
            })}
            error={errors.password && errors.password.message}
            style={{ width: isScreenBig ? "50%" : "100%" }}
          />
          {checkPassword.length > 7 ? (
            <Group
              position="left"
              style={{ width: isScreenBig ? "50%" : "100%" }}
            >
              <Text color="teal" size="lg">
                <RiCheckboxCircleLine />
              </Text>
              <Text color="teal" size="sm">
                Minimum length is 8
              </Text>
            </Group>
          ) : (
            <Group
              position="left"
              style={{ width: isScreenBig ? "50%" : "100%" }}
            >
              {/* <Text color="teal" size="lg"><RiCheckboxCircleLine/></Text> */}
              <Text color="gray" size="sm">
                Minimum length is 8
              </Text>
            </Group>
          )}

          <Text size="sm" color={themes.colors.gray[6]}>
            By signing up I agree with terms &#38; conditions and receive
            marketing email in the future
          </Text>
          <Button type="submit" style={{ width: isScreenBig ? "50%" : "100%" }}>
            Sign Up
          </Button>
        </Group>
      </form>
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

export default SignUp;
