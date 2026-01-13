export default function ButtonSubmit({ children, variant, disabled}) {
    return(
        <button  
            className="btn btn-primary"
            variant={variant}
            type="submit"
            disabled={disabled}
        >{children}</button>
    )
}