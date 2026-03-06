type FormInputProps = {
    id?: string;
    type?: "text" | "number" | "email" | "password";
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
};

const FormInput = ({
    id,
    type = "text",
    name,
    value,
    onChange,
    required = false,
    placeholder,
}: FormInputProps) => {
    return (
        <input
            id={id ?? name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
        />
    );
};

export default FormInput;
