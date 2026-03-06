type FormButtonProps = {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
};

const FormButton = ({ type = "button", onClick, children }: FormButtonProps) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default FormButton;
