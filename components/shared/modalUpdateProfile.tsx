import { Box, Button, Group, Modal, TextInput, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { customerUpdate } from "../../lib/shopify";
import { TInputCustomerUpdateProfile } from "../../types";
import AlertCard from "./alertCard";

interface ModalUpdateProfileProps {
  profile: TInputCustomerUpdateProfile;
  token: string;
}

const ModalUpdateProfile: FC<ModalUpdateProfileProps> = ({
  profile,
  token,
}) => {
  const [opened, setOpened] = useState(false);
  const [updateError, setUpdateError] = useState();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TInputCustomerUpdateProfile>({
    defaultValues: {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
    },
  });
  const onSubmit: SubmitHandler<TInputCustomerUpdateProfile> = async (data) => {
    let formattedData = JSON.parse(JSON.stringify(data));
    formattedData.phone = `+${formattedData.phone}`;

    const res = await customerUpdate(formattedData, token);
    if (res.errors || Array.isArray(res)) {
      setUpdateError(res);
    } else {
      setOpened(false);
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
          <div style={{ display: "flex", columnGap: "0.5rem" }}>
            <>
              <TextInput
                required
                label="First Name"
                placeholder="John"
                style={{ width: "100%" }}
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: {
                    value: 30,
                    message: "Reached max characters limit",
                  },
                })}
                error={errors.firstName && errors.firstName.message}
              />
            </>
            <>
              <TextInput
                required
                label="Last Name"
                placeholder="Doe"
                style={{ width: "100%" }}
                {...register("lastName", {
                  required: "Last name is required",
                  maxLength: {
                    value: 60,
                    message: "Reached max characters limit",
                  },
                })}
                error={errors.lastName && errors.lastName.message}
              />
            </>
          </div>

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
          />

          <Box>
            <Text size="sm" weight={500}>
              Phone
              <Text size="xs" color="red" weight={500} component="sup">
                *
              </Text>
            </Text>
            <PhoneInput
              inputStyle={{ width: "100%" }}
              country={"my"}
              value={getValues("phone")}
              onChange={(phone) => {
                setValue("phone", phone);
              }}
            />
            {errors.phone && <Text color="red">Phone is required</Text>}
          </Box>

          <Group position="center" mt="md">
            <Button fullWidth type="submit">
              Update Profile
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button variant="subtle" compact onClick={() => setOpened(true)}>
          Edit Profile
        </Button>
      </Group>
    </>
  );
};

export default ModalUpdateProfile;
