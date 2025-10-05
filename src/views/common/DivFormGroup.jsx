export default function DivFormGroup({ children, controlId}) {
    return(
        <div className="form-group" controlId={controlId}>
            {children}
        </div>
    )
}