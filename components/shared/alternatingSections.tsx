import { Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useEffect, useState } from "react";
import { screenSizes, TExtraInfo } from "../../types";

interface AlternatingSectionsProps {
  infos: TExtraInfo[];
}

const AlternatingSections: FC<AlternatingSectionsProps> = ({ infos }) => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<Boolean>();

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
            <img
              style={{
                width: isScreenBig ? "50%" : "100%",
                borderRadius: "5px",
              }}
              src={info.imageURL}
            />
            <Group direction="column" spacing={"xs"}>
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
                      {info.content.map((data) => (
                        <p>{data}</p>
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
