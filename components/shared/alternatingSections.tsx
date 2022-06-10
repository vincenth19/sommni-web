import { Group, Image as MantineImage } from "@mantine/core";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useEffect, useState } from "react";
import { screenSizes, TExtraInfo } from "../../types";

interface AlternatingSectionsProps {
  infos: TExtraInfo[];
}

function isValidUrl(path: string) {
  const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  const res = matchPattern.test(path);
  return res;
}

const AlternatingSections: FC<AlternatingSectionsProps> = ({ infos }) => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  return (
    <>
      {infos.map((info, index) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem 0",
              alignItems: "center",
              flexDirection: isScreenBig
                ? index % 2 === 0
                  ? "row"
                  : "row-reverse"
                : "column",
            }}
            key={index}
          >
            {info.imageURL !== "" && (
              <>
                {isValidUrl(info.imageURL) ? (
                  <>
                    <MantineImage
                      radius={"md"}
                      style={{
                        width: isScreenBig ? "50%" : "100%",
                        borderRadius: "5px",
                      }}
                      src={info.imageURL}
                      alt={"extra-product-info-image"}
                    />
                  </>
                ) : (
                  <Image src={info.imageURL} width={1000} height={850} />
                )}
              </>
            )}

            <Group
              style={{
                width: isValidUrl(info.imageURL)
                  ? isScreenBig
                    ? "50%"
                    : "100%"
                  : "100%",
              }}
              direction="column"
              spacing={"xs"}
            >
              <h3 style={{ margin: 0 }}>{info.title}</h3>
              {/* {typeof info.content === "string" ? (
                <p>{info.content}</p>
              ) : (
                info.content
              )} */}
              {Array.isArray(info.content) ? (
                <>
                  {typeof info.content[0] === "string" ? (
                    <>
                      {info.content.map((data, index) => (
                        <p key={index}>{data}</p>
                      ))}
                    </>
                  ) : (
                    <>
                      {info.content.map((data) => (
                        <>{data}</>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {typeof info.content === "string" ? (
                    <p>{info.content}</p>
                  ) : (
                    <>{info.content}</>
                  )}
                </>
              )}
            </Group>
          </div>
        );
      })}
    </>
  );
};

export default AlternatingSections;
