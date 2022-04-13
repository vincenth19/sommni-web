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

    console.log("data", formattedData);
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
                {...register("firstName", { required: true, maxLength: 40 })}
              />
              {errors.firstName && <span>This field is required</span>}
            </>
            <>
              <TextInput
                required
                label="Last Name"
                placeholder="Doe"
                style={{ width: "100%" }}
                {...register("lastName", { required: true, maxLength: 60 })}
              />
              {errors.lastName && <span>This field is required</span>}
            </>
          </div>

          <TextInput
            required
            label="Email"
            placeholder="johndoe@gmail.com"
            style={{ width: "100%" }}
            {...register("email", { required: true, maxLength: 30 })}
          />
          {errors.firstName && <span>This field is required</span>}

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
            {errors.phone && <span>This field is required</span>}
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
