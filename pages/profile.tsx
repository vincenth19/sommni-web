import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useContextData } from "../AppContext";
import { decrypt } from "../lib/cryptojs";
import dynamic from "next/dynamic";
import {
  customerAddressDelete,
  customerDefaultAddressUpdate,
  getCustomer,
} from "../lib/shopify";
import { TCustomer, TCustomerAddress } from "../types";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const ModalAddEditAddress = dynamic(
  () => import("../components/shared/modalAddEditAddress")
);
const ModalUpdateProfile = dynamic(
  () => import("../components/shared/modalUpdateProfile")
);
const ModalUpdatePassword = dynamic(
  () => import("../components/shared/modalUpdatePassword")
);
const Loading = dynamic(() => import("../components/shared/loading"));
const AlertCard = dynamic(() => import("../components/shared/alertCard"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

const Profile: NextPage = () => {
  const [hasCookie, setHasCookie] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<TCustomer | null>();
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [usertoken, setUsertoken] = useState<string | null>(null);

  const { setUser } = useContextData();
  const router = useRouter();

  const cookieRemover = () => {
    removeCookie("login", { path: "/" });
  };

  useEffect(() => {
    const getData = async (token: string) => {
      const res = await getCustomer(token);
      if (res) {
        setUserData(res);
      } else {
        setHasCookie(false);
      }
    };

    if (cookies.login) {
      setHasCookie(true);
      const decryptedID = decrypt(cookies.login);
      if (decryptedID) {
        const cleanedID = decryptedID.replace(/['"]+/g, "");
        getData(cleanedID);
        setUsertoken(cleanedID);
      }
    } else {
      setHasCookie(false);
    }
  }, [cookies.login]);

  useEffect(() => {
    if (userData) {
      setUser(userData.displayName);
    } else {
      setUser(null);
    }
  }, [userData, setUser]);

  return (
    <MainFrame>
      {hasCookie === null && (
        <>
          <Loading height="80vh" text="Checking local data..." />
        </>
      )}
      {hasCookie === false ? (
        <>
          <Group
            direction="column"
            position="center"
            style={{ minHeight: "51vh" }}
          >
            <TitleSection title={"No Profile"} />
            <Text size="xl">Please sign in to view your profile</Text>
            <Link href="/sign-in" passHref>
              <Button size="lg" component="a">
                Sign In
              </Button>
            </Link>
          </Group>
        </>
      ) : (
        <>
          {userData && usertoken ? (
            <>
              <TitleSection title={"profile"} />
              <ProfileInfo
                userdata={userData}
                token={usertoken}
                cookieRemover={cookieRemover}
              />
              <Divider my="sm" />
              <Button
                fullWidth
                variant="light"
                style={{ margin: "1rem 0" }}
                onClick={() => {
                  removeCookie("login", { path: "/" });
                  setUser((prev) => (prev = null));
                  router.push("/sign-in");
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Loading height="51vh" text="Getting your profile..." />
          )}
        </>
      )}
    </MainFrame>
  );
};

interface ProfileInfoProps {
  userdata: TCustomer | null;
  token: string;
  cookieRemover: () => void;
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  userdata,
  token,
  cookieRemover,
}) => {
  const [errors, setErrors] = useState<any>(null);
  const router = useRouter();
  const themes = useMantineTheme();
  return (
    <>
      {userdata && (
        <>
          {errors && (
            <AlertCard title={"An error(s) occurred"} errors={errors} />
          )}
          <Card shadow={"sm"}>
            <Group direction="column">
              <Group position="apart" style={{ width: "100%" }}>
                <Group>
                  <Avatar size="md" src={null} color="brand" />
                  <Text size="lg" weight={700}>
                    {userdata.displayName}
                  </Text>
                </Group>
                <Group>
                  <ModalUpdateProfile
                    token={token}
                    profile={{
                      email: userdata.email,
                      firstName: userdata.firstName!,
                      lastName: userdata.lastName!,
                      phone: userdata.phone!,
                    }}
                  />
                  <ModalUpdatePassword
                    token={token}
                    cookieRemover={cookieRemover}
                  />
                </Group>
              </Group>
              <SimpleInfo label="Email" data={userdata.email} />
              <SimpleInfo label="Phone" data={userdata.phone} />
            </Group>
          </Card>

          <Divider my="sm" />

          <Group direction="column" spacing={"xs"}>
            {userdata.defaultAddress ? (
              <>
                <Group position="apart" style={{ width: "100%" }}>
                  <h2>Address</h2>
                  <ModalAddEditAddress
                    address={userdata.defaultAddress}
                    token={token}
                    mode="add"
                    id={
                      userdata.defaultAddress.id
                        ? userdata.defaultAddress.id
                        : ""
                    }
                  />
                </Group>
                <Card
                  shadow="sm"
                  style={{
                    width: "100%",
                    border: `3px solid ${themes.colors.brand[1]}`,
                  }}
                >
                  <AddressBox
                    address={userdata.defaultAddress}
                    isDefault={true}
                  />

                  <Group style={{ marginTop: "0.5rem" }}>
                    {/* <Button variant="subtle">Edit</Button> */}
                    <ModalAddEditAddress
                      address={userdata.defaultAddress}
                      token={token}
                      id={
                        userdata.defaultAddress.id
                          ? userdata.defaultAddress.id
                          : ""
                      }
                    />
                  </Group>
                </Card>
                {userdata.addresses.edges.length > 0 && (
                  <>
                    {userdata.addresses.edges.map((address) => {
                      if (address.node.id !== userdata.defaultAddress?.id) {
                        return (
                          <Card
                            key={address.node.id}
                            shadow="sm"
                            style={{ width: "100%" }}
                          >
                            <AddressBox
                              address={address.node}
                              isDefault={false}
                            />
                            <Group style={{ marginTop: "0.5rem" }}>
                              {/* <Button variant="subtle">Edit</Button> */}
                              <ModalAddEditAddress
                                address={address.node}
                                token={token}
                                id={address.node.id ? address.node.id : ""}
                              />
                              <Button
                                variant="subtle"
                                onClick={async () => {
                                  if (address.node.id) {
                                    const res = customerDefaultAddressUpdate(
                                      token,
                                      address.node.id
                                    );
                                    if (Array.isArray(res)) {
                                      setErrors(res);
                                    } else {
                                      router.reload();
                                    }
                                  }
                                }}
                              >
                                Set as default
                              </Button>
                              <Button
                                variant="subtle"
                                onClick={async () => {
                                  if (address.node.id) {
                                    const res = customerAddressDelete(
                                      token,
                                      address.node.id
                                    );
                                    if (Array.isArray(res)) {
                                      setErrors(res);
                                    } else {
                                      router.reload();
                                    }
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </Group>
                          </Card>
                        );
                      }
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                <Text>No address in this account</Text>
                <ModalAddEditAddress mode="add" token={token} />
              </>
            )}
          </Group>
        </>
      )}
    </>
  );
};

interface AddressBoxProps {
  address: TCustomerAddress;
  isDefault?: boolean;
}

const AddressBox: FC<AddressBoxProps> = ({ address, isDefault = "false" }) => {
  const themes = useMantineTheme();

  return (
    <Group direction="column" spacing={"xs"}>
      <Group>
        <h4>{address.name}</h4>
        {isDefault && <Badge>Default</Badge>}
      </Group>

      <div
        style={{
          display: "flex",
          columnGap: "5px",
        }}
      >
        <Text>{address.address1},</Text>
        <Text>{address.address2}</Text>
      </div>

      <Text size="sm">{address.phone}</Text>
      <div
        style={{
          display: "flex",
          columnGap: "5px",
          color: themes.colors.gray[7],
        }}
      >
        {address.city && <Text size="sm">{address.city},</Text>}
        {address.zip && <Text size="sm">{address.zip},</Text>}
        {address.province && <Text size="sm">{address.province},</Text>}
        {address.country && <Text size="sm">{address.country},</Text>}
      </div>
    </Group>
  );
};

interface SimpleInfoProps {
  colorData?: string;
  label: string;
  data: string | null;
}

const SimpleInfo: FC<SimpleInfoProps> = ({
  colorData = "#1b1b1b",
  label,
  data,
}) => {
  const themes = useMantineTheme();
  return (
    <Group>
      <Text style={{ color: themes.colors.gray[6] }}>{label}</Text>
      <Text style={{ color: colorData }}>{data ? data : "-"}</Text>
    </Group>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Profile;
