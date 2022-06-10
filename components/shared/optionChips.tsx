import { Chip, Chips, Text } from "@mantine/core";
import { FC } from "react";
import { TProductOption } from "../../types";

interface ProductOptionsProps {
  valueState: any;
  valueSetter: (value: any) => void;
  options: TProductOption[];
  chipSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

const OptionChips: FC<ProductOptionsProps> = ({
  valueState,
  valueSetter,
  options,
  chipSize = "md",
}) => {
  return (
    <>
      {options.map((option) => {
        return (
          <span key={option.id}>
            <Text weight={500}>{option.name}</Text>
            <Chips
              size={chipSize}
              style={{ paddingTop: "0.5rem", paddingBottom: "1rem" }}
              multiple={false}
              value={valueState[option.name]}
              onChange={(value) =>
                valueSetter(
                  (prev: any) => (prev = { ...prev, [option.name]: value })
                )
              }
            >
              {option.values.map((value) => {
                return (
                  <Chip key={value} value={value}>
                    {value}
                  </Chip>
                );
              })}
            </Chips>
          </span>
        );
      })}
    </>
  );
};

export default OptionChips;
