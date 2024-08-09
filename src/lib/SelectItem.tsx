import { useEffect, useState } from "react";

interface DefaultValue {
  label: string;
  value: string;
  disabled?: boolean;
  hidden?: boolean;
}

interface Option {
  label: string;
  value: string;
}

interface SelectItemProps {
  label: string;
  id: string;
  className?: string;
  defaultValue?: DefaultValue;
  name: string;
  // value?: string;
  options: Option[];
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  label,
  id,
  className,
  defaultValue,
  name,
  options,
  handleSelect,
}) => {
  const [dValue, setDValue] = useState<string>(
    defaultValue?.value || options[0]?.value
  );

  useEffect(() => {
    if (defaultValue) {
      setDValue(defaultValue.value);
    } else if (options.length > 0) {
      setDValue(options[0].value);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDValue(event.target.value);
    console.log("selected option:", event.target.value);

    handleSelect(event);
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        className={className}
        value={dValue}
        onChange={handleChange}
      >
        {defaultValue && (
          <option
            value={defaultValue.value}
            disabled={defaultValue.disabled}
            hidden={defaultValue.hidden}
          >
            {defaultValue.label}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectItem;
