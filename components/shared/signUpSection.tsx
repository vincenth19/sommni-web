import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";

const SignUpSection = () => {
  const themes = useMantineTheme();
  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: themes.colors.brand[0],
        borderRadius: 10,
        margin: "10px 0",
      }}
    >
      <Group direction="column" position="center" spacing={"lg"}>
        <Text
          weight={700}
          style={{ fontSize: "2rem", color: themes.colors.brand[9] }}
        >
          Sign up today!
        </Text>
        <Link href="/sign-up" passHref>
          <Button component="a" size="lg">
            Sign Up
          </Button>
        </Link>
      </Group>
    </div>
  );
};

export default SignUpSection;
