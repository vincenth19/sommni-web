import { Alert } from "@mantine/core";
import { FC, ReactElement } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

interface ApiErrorProps {
  icon?: ReactElement;
  title?: string;
  color?:
    | "dark"
    | "gray"
    | "red"
    | "pink"
    | "grape"
    | "violet"
    | "indigo"
    | "cyan"
    | "teal"
    | "green"
    | "lime"
    | "yellow";
}

const AlertCard: FC<ApiErrorProps> = ({
  icon = <RiErrorWarningLine />,
  title = "Oops... something wrong",
  color = "red",
  children,
}) => {
  return (
    <Alert
      icon={
        <span
          style={{
            fontSize: "1.75rem",
          }}
        >
          {icon}
        </span>
      }
      title={title}
      color={color}
    >
      {children}
    </Alert>
  );
};

export default AlertCard;
