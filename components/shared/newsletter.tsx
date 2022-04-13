import { Button, Group, Input, Text, useMantineTheme } from "@mantine/core";
import { useForm, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { screenSizes } from "../../types";

const NewsletterSection = () => {
  const themes = useMantineTheme();
  const [userEmail, setUserEmail] = useState({ email: "" });

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: 10,
        margin: "10px 0",
        width: "100%",
      }}
    >
      <Group direction="column" position="center" spacing={"lg"}>
        <Text
          weight={700}
          align="center"
          style={{ fontSize: "2rem", color: themes.colors.brand[9] }}
        >
          Get our latest news & offering
        </Text>
        <NewsletterForm
          initialValues={{ email: "" }}
          onSubmit={(data) => {
            setUserEmail(data);
            console.log("email", data);
          }}
          onCancel={() => {}}
        />
      </Group>
    </div>
  );
};

interface NewsletterFormProps {
  initialValues: { email: string };
  onSubmit(values: { email: string }): void;
  onCancel(): void;
}

const NewsletterForm = ({ initialValues, onSubmit }: NewsletterFormProps) => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  const form = useForm({
    initialValues,
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)} style={{ width: "100%" }}>
      <Group spacing="md" position="center">
        <Input
          required
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          style={{ width: isScreenBig ? "50%" : "100%" }}
        />
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default NewsletterSection;
