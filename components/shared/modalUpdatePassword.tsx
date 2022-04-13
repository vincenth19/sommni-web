import { Button, Group, Modal, PasswordInput } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { customerUpdatePassword } from "../../lib/shopify";
import AlertCard from "./alertCard";

interface ModalUpdatePasswordProps {
  token: string;
  cookieRemover: () => void;
}

type TFormInput = {
  password: string;
  confirmPassword: string;
};

const ModalUpdatePassword: FC<ModalUpdatePasswordProps> = ({
  token,
  cookieRemover,
}) => {
  const [opened, setOpened] = useState(false);
  const [updateError, setUpdateError] = useState();

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
    const res = await customerUpdatePassword(data.password, token);
    if (res.errors || Array.isArray(res)) {
      setUpdateError(res);
    } else {
      setOpened(false);
      cookieRemover();
      router.reload();
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Edit Profile"}
      >
        {updateError && <AlertCard errors={updateError} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            required
            label="New Password"
            style={{ width: "100%" }}
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
            label="Confirm Password"
            style={{ width: "100%" }}
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues("password") || "The passwords do not match",
            })}
            error={errors.confirmPassword && errors.confirmPassword.message}
          />

          <Group position="center" mt="md">
            <Button fullWidth type="submit">
              Change Password
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button variant="subtle" compact onClick={() => setOpened(true)}>
          Change Password
        </Button>
      </Group>
    </>
  );
};

export default ModalUpdatePassword;
