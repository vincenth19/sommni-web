import { Button, Container, Group, Text, useMantineTheme } from "@mantine/core";

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
        <Button size="lg">Sign Up</Button>
      </Group>
    </div>
  );
};

export default SignUpSection;
