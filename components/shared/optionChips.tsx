import { Chip, Chips } from "@mantine/core";
import { FC } from "react";
import { TOptionData } from "../../types";

interface ProductOptionsProps {
  valueState: string;
  valueSetter: (value: string) => void;
  options: TOptionData[];
  chipSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

const OptionChips: FC<ProductOptionsProps> = ({
  valueState,
  valueSetter,
  options,
  chipSize = "md",
}) => {
  return (
    <Chips
      size={chipSize}
      aria-label="Select product size"
      style={{ padding: "1rem 0" }}
      multiple={false}
      value={valueState}
      onChange={valueSetter}
    >
      {options.map((data) => {
        return (
          <Chip disabled={data.disable} value={data.value}>
            {data.label}
          </Chip>
        );
      })}
    </Chips>
  );
};

export default OptionChips;
