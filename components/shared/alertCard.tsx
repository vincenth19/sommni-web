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
  title = "Oops... there is something wrong",
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
      {errors ? (
        <>
          {Array.isArray(errors) ? (
            <>
              {errors.length > 0 ? (
                <>
                  {errors.map((el: TCustomerUserError) => {
                    return (
                      <>
                        <p key={el.code}>{el.message}</p>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <p>
                    Unknown error occurred. Please contact us and let us know
                    what happened.
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              {errors.errors.map((el: TError) => {
                return <p key={el.message}>{el.message}</p>;
              })}
            </>
          )}
        </>
      ) : (
        <p>
          Unknown error occurred. Please contact us and let us know what
          happened.
        </p>
      )}
      {children}
    </Alert>
  );
};

export default AlertCard;
