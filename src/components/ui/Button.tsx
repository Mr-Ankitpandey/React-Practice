type ButtonProps = {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
};

const Button = ({ type = "button", onClick, children }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
