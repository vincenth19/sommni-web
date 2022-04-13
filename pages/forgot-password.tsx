import { Button, Group, TextInput, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiInformationLine } from "react-icons/ri";
import { customerRecover } from "../lib/shopify";
import { screenSizes } from "../types";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const AlertCard = dynamic(() => import("../components/shared/alertCard"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

type TFormInput = {
  email: string;
};

const ForgotPassword: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();

  const [success, setSuccess] = useState(false);
  const [updateError, setUpdateError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    const res = await customerRecover(data.email);
    if (res.errors || res.length > 0) {
      setUpdateError(res);
    } else {
      setSuccess(true);
    }
  };

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  return (
    <MainFrame>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", padding: "5.05rem 0" }}
      >
        <Group direction="column" position="center">
          <TitleSection title="Forgot Password" />
          {updateError && <AlertCard errors={updateError} />}
          {success && (
            <Group position="center">
              <Text color="blue" size="xl">
                <RiInformationLine />
              </Text>
              <Text>
                Please check your email and open our email to reset your
                password.
              </Text>
            </Group>
          )}
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

          <Button
            type="submit"
            title="Reset My Password"
            style={{ width: isScreenBig ? "50%" : "100%" }}
          >
            Reset My Password
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

export default ForgotPassword;
