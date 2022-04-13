import { Alert } from "@mantine/core";
import { FC, ReactElement } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { TApiError, TCustomerUserError, TError } from "../../types";

interface ApiErrorProps {
  icon?: ReactElement;
  title?: string;
  errors?: TCustomerUserError[] | TApiError | null;
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
  errors = null,
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
      {errors && (
        <>
          {Array.isArray(errors) ? (
            <>
              {errors.map((el: TCustomerUserError) => {
                return (
                  <>
                    <p>{el.message}</p>
                  </>
                );
              })}
            </>
          ) : (
            <>
              {errors.errors.map((el: TError) => {
                return <p key={el.message}>{el.message}</p>;
              })}
            </>
          )}
        </>
      )}
      {children}
    </Alert>
  );
};

export default AlertCard;
