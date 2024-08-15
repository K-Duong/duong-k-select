import { useState } from "react";

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectItemProps {
  label: string;
  id: string;
  className?: string;
  name: string;
  selectedOption?: string;
  options: Option[];
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  label,
  id,
  className,
  name,
  options,
  selectedOption,
  handleSelect,
}) => {
  const [value, setValue] = useState(options.length > 0 ? options[0].value : "");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    handleSelect(event);
  };
  // if(options.length === 0) {
  //   console.error(`Error: There are no option to select ${label}`)
  //   return
  // }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        className={className}
        value={selectedOption || value}
        onChange={handleChange}
      >
         {options.length > 0 ? (
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))
        ) : (
          // in case of no option
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </>
  );
};
export default SelectItem;
