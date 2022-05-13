import { Stepper } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { BiPackage } from "react-icons/bi";
import { BsFillCartCheckFill, BsSearch, BsCheckCircle } from "react-icons/bs";
import {
  MdPrecisionManufacturing,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { GiFactory } from "react-icons/gi";

export const steps = [
  { title: "Order Placed", icon: <BsFillCartCheckFill /> },
  { title: "Manufacturing", icon: <GiFactory /> },
  { title: "Assembly", icon: <MdPrecisionManufacturing /> },
  { title: "Quality Control Check", icon: <BsSearch /> },
  { title: "Packing", icon: <BiPackage /> },
  { title: "Shipping", icon: <MdOutlineLocalShipping /> },
  { title: "Successfully Delivered", icon: <BsCheckCircle /> },
];

interface StepperTrackingProps {
  defaultActive?: number;
}

const StepperTracking: FC<StepperTrackingProps> = ({ defaultActive = 1 }) => {
  const [active, setActive] = useState(defaultActive);

  useEffect(() => {
    setActive(defaultActive);
  }, [defaultActive]);

  return (
    <Stepper
      size="sm"
      breakpoint={"sm"}
      active={active}
      style={{ overflowX: "auto" }}
    >
      {steps.map((step) => {
        return (
          <Stepper.Step
            key={step.title}
            size="xs"
            icon={step.icon}
            label={step.title}
          ></Stepper.Step>
        );
      })}
    </Stepper>
  );
};

export default StepperTracking;
