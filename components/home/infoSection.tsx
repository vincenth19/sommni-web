import { Button, Group, Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import {
  // RiMoonClearLine,
  // RiNumber0,
  RiTruckLine,
} from "react-icons/ri";
import { screenSizes } from "../../types";

type TInfo = {
  icon: ReactElement;
  title: string;
  content: string;
  path?: string;
};

const InfoSection = () => {
  const [opened, setOpened] = useState(false);
  const [modalData, setModalData] = useState<TInfo | null>(null);
  const themes = useMantineTheme();
  const { t } = useTranslation("home");
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isNotMobile, setIsNotMobile] = useState<boolean>(true);

  useEffect(() => {
    setIsNotMobile(biggerScreen);
  }, [biggerScreen]);

  const infos: TInfo[] = [
    {
      icon: <RiTruckLine />,
      title: t("info-delivery"),
      content:
        "We offer free, safe no-contact delivery and free returns with every order, no matter how big or small. Orders usually deliver within 3-11 business days with our carrier Lalamove. Shipping times may vary during the holiday season.",
    },
    // {
    //   icon: <RiMoonClearLine />,
    //   title: t("info-nightsTrial"),
    //   content:
    //     "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.",
    //   path: "/nights-trial",
    // },
    // {
    //   icon: <RiNumber0 />,
    //   title: t("info-instalment"),
    //   content:
    //     "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
    //   path: "/instalment",
    // },
  ];

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setModalData(null);
        }}
        title={modalData && modalData.title}
        centered
        overflow="inside"
      >
        {modalData && (
          <>
            <div style={{ color: themes.colors.teal[5], fontSize: "3rem" }}>
              {modalData.icon}
            </div>
            <text style={{ color: themes.colors.gray[7] }}>
              {modalData.content}
            </text>
          </>
        )}
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "white",
          padding: "10px 0",
        }}
      >
        {infos.map((data) => {
          if (!data.path) {
            return (
              <Button
                key={data.title}
                variant="subtle"
                onClick={() => {
                  setOpened(true);
                  setModalData(data);
                }}
              >
                <Group spacing={"sm"} noWrap={true}>
                  <span
                    style={{
                      color: themes.colors.teal[5],
                      fontSize: "1.25rem",
                    }}
                  >
                    {data.icon}
                  </span>
                  <span style={{ color: themes.colors.brand[9] }}>
                    {data.title}
                  </span>
                </Group>
              </Button>
            );
          } else {
            return (
              <Link key={data.title} href={data.path} passHref>
                <Button component="a" key={data.title} variant="subtle">
                  <Group spacing={"sm"} noWrap={true}>
                    <span
                      style={{
                        color: themes.colors.teal[5],
                        fontSize: "1.25rem",
                      }}
                    >
                      {data.icon}
                    </span>
                    <span style={{ color: themes.colors.brand[9] }}>
                      {data.title}
                    </span>
                  </Group>
                </Button>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default InfoSection;
