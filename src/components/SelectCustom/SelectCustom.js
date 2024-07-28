import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";

const CustomMenuItem = styled(MenuItem)({
  "&.Mui-selected": {
    backgroundColor: "rgba(220, 190, 108, 0.40) !important",
    "&:hover": {
      backgroundColor: "rgba(220, 190, 108, 0.70) !important",
    },
  },
});

const SelectCustom = ({
  label,
  options,
  valueProp,
  labelProp,
  minWidth,
  initialValue,
  onChange,
  resetValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || "");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(event);
  };

  useEffect(() => {
    if (resetValue) {
      setSelectedValue("");
    }
  }, [resetValue]);

  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue]);

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: minWidth,
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(220, 190, 108, 1)",
          },
        },
        "& .Mui-focused .MuiInputLabel-root": {
          color: "rgba(220, 190, 108, 1) !important",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "rgba(220, 190, 108, 1) !important",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(220, 190, 108, 1)",
        },
      }}
      size="small"
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={handleChange}
        label={label}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "initial",
          },
        }}
      >
        {options.map((option) => (
          <CustomMenuItem key={option[valueProp]} value={option[valueProp]}>
            {option[labelProp]}
          </CustomMenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCustom;
