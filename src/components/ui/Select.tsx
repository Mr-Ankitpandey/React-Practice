type SelectOption = {
  value: string | number;
};

type FormSelectProps = {
  id?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
};

const Select = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
}: FormSelectProps) => {
  return (
    <select id={id} value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options?.map((opt) => (
        <option key={opt?.value} value={opt?.value}>
          {opt?.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
