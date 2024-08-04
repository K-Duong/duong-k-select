
interface Option {
  label: string,
  value: string,
} 

interface SelectItemProps {
  label: string;
  id: string;
  className?: string;
  defaultValue?: string;
  name: string;
  value?: string;
  options: Option[];
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  label,
  id,
  className,
  defaultValue,
  name,
  value,
  options,
  handleSelect,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        className={className}
        value={value}
        onChange={handleSelect}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
export default SelectItem;
