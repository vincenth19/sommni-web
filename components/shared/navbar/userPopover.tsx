import { useState } from "react";
import {
  Popover,
  Button,
  PasswordInput,
  Group,
  TextInput,
  Anchor,
} from "@mantine/core";
import { RiUserLine } from "react-icons/ri";
import { useForm } from "@mantine/hooks";

const UserPopover = () => {
  const [opened, setOpened] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          size="lg"
          variant="subtle"
          compact
          onClick={() => setOpened((o) => !o)}
        >
          <RiUserLine />
        </Button>
      }
      width={260}
      position="bottom"
      placement="end"
      withCloseButton
      withArrow
      title="Sign In"
      transition="pop-top-right"
    >
      <UserPopoverForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(data) => {
          setLoginData(data);
          console.log("login", data);
          setOpened(false);
        }}
        onCancel={() => setOpened(false)}
      />
    </Popover>
  );
};

interface UserPopoverFormProps {
  initialValues: { email: string; password: string };
  onSubmit(values: { email: string; password: string }): void;
  onCancel(): void;
}

const UserPopoverForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: UserPopoverFormProps) => {
  const form = useForm({
    initialValues,
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.trim().length > 2,
    },
  });
  return (
    <form onSubmit={form.onSubmit(onSubmit)} style={{ width: "100%" }}>
      <Group direction="column">
        <TextInput
          placeholder="Email"
          style={{ width: "100%" }}
          label="Email"
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email}
          required
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={form.errors.password}
          required
          style={{ width: "100%" }}
        />

        <Group position="apart" style={{ width: "100%" }}>
          <Anchor component="button" color="gray" size="sm" onClick={onCancel}>
            Cancel
          </Anchor>
          <Button type="submit" compact size="sm">
            Sign In
          </Button>
        </Group>
      </Group>
    </form>
  );
};

export default UserPopover;
