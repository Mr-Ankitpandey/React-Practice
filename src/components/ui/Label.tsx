
type labelProps = {
    htmlfor : string,
    children : React.ReactNode
}

const Label = ({htmlfor="", children}:labelProps)=> {
    return (
        <label htmlFor={htmlfor}>{children}</label>
    )
}

export default Label;