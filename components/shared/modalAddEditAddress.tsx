import {
  Button,
  Group,
  Modal,
  TextInput,
  NativeSelect,
  Text,
  Box,
} from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  customerAddressCreate,
  customerAddressUpdate,
} from "../../lib/shopify";
import {
  TApiError,
  TBasicAddress,
  TCustomerAddress,
  TCustomerUserError,
} from "../../types";
import AlertCard from "./alertCard";

interface EditAddressModalProps {
  address?: TBasicAddress | TCustomerAddress;
  token: string;
  id?: string;
  mode?: "add" | "edit"; // please pass ID and address when in "add" mode
}

const ModalAddEditAddress: FC<EditAddressModalProps> = ({
  address,
  token,
  id,
  mode = "edit",
}) => {
  const [opened, setOpened] = useState(false);
  const [states, setStates] = useState<any>([]);
  const [updateError, setUpdateError] = useState<
    TCustomerUserError[] | TApiError | null
  >(null);

  const router = useRouter();

  function getStateName(stateName: string) {
    let opt: string = "";

    for (let i = 0; i < states.length; i++) {
      if (states[i].label === stateName) {
        opt = states[i].label;
        break;
      }
    }

    return opt;
  }

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    address1: string;
    address2: string;
    firstName: string;
    lastName: string;
    phone: string;
    company: string;
    country: string;
    province: string;
    city: string;
    zip: string;
  }>({
    defaultValues: {
      address1: mode === "add" ? "" : address?.address1 ? address.address1 : "",
      address2: mode === "add" ? "" : address?.address2 ? address.address2 : "",
      city: mode === "add" ? "" : address?.city ? address.city : "",
      company: mode === "add" ? "" : address?.company ? address.company : "",
      country:
        mode === "add" ? "Malaysia" : address?.country ? address.country : "",
      firstName:
        mode === "add" ? "" : address?.firstName ? address.firstName : "",
      lastName: mode === "add" ? "" : address?.lastName ? address.lastName : "",
      phone: mode === "add" ? "" : address?.phone ? address.phone : "",
      province:
        mode === "add"
          ? "Kuala Lumpur"
          : address?.province
          ? address.province
          : "",
      zip: mode === "add" ? "" : address?.zip ? address.zip : "",
    },
  });

  const onSubmit: SubmitHandler<TBasicAddress> = async (
    data: TBasicAddress
  ) => {
    if (mode === "add") {
      setValue("country", "Malaysia");
      const res = await customerAddressCreate(data, token);
      if (res.errors || Array.isArray(res)) {
        setUpdateError(res);
      } else {
        setOpened(false);
        router.reload();
      }
    } else {
      if (id) {
        const res = await customerAddressUpdate(data, token, id);
        if (res.errors || Array.isArray(res)) {
          setUpdateError(res);
        } else {
          setOpened(false);
          router.reload();
        }
      }
    }
  };

  useEffect(() => {
    const newStates = State.getStatesOfCountry("MY").map((el) => {
      return { value: el.name, label: el.name };
    });
    setStates(newStates);
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={mode === "add" ? "Add Address" : "Edit Address"}
      >
        {updateError && <AlertCard errors={updateError} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            <TextInput
              required
              label="Address"
              placeholder="Jalan Durian No. 123"
              {...register("address1", { required: true, maxLength: 100 })}
            />

            <TextInput
              required
              placeholder="Description, block no, etc."
              {...register("address2", { required: true, maxLength: 50 })}
            />
            {errors.address1 && <span>This field is required</span>}
            {errors.address2 && <span>This field is required</span>}
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

            <TextInput
              label="Company"
              style={{ width: "100%" }}
              {...register("company")}
            />

            <NativeSelect
              label="Province"
              required
              defaultValue={
                mode === "add"
                  ? "Kuala Lumpur"
                  : getStateName(address?.province!)
              }
              data={states}
              onChange={(event) => {
                let name = getStateName(event.target.value);
                if (name) {
                  setValue("province", name);
                }
              }}
            />

            <TextInput
              required
              label="City"
              placeholder="Kuala Lumpur"
              {...register("city", { required: true, maxLength: 30 })}
            />
            {errors.city && <span>This field is required</span>}

            <TextInput
              required
              label="ZIP"
              placeholder="47500"
              {...register("zip", {
                required: true,
                minLength: 5,
                maxLength: 6,
                pattern: /^[0-9]*$/,
              })}
            />
            {errors.zip && (
              <Text size="sm" color="red">
                You need 5 numbers
              </Text>
            )}

            <Group position="center" mt="md">
              <Button fullWidth type="submit">
                {mode === "add" ? "Add Address" : "Update Address"}
              </Button>
            </Group>
          </div>
        </form>
      </Modal>

      <Group position="center">
        <Button variant="subtle" compact onClick={() => setOpened(true)}>
          {mode === "add" ? "Add Address" : "Edit"}
        </Button>
      </Group>
    </>
  );
};

export default ModalAddEditAddress;
