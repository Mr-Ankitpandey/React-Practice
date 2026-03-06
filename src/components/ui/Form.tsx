type FormProps = {
    action: (formData: FormData) => void;
    children: React.ReactNode;
};

const Form = ({ action, children }: FormProps) => {
    return <form action={action}>{children}</form>;
};

export default Form;
