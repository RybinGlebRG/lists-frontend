export const Header= (props)=>{
    let buttons = props.buttons.map(item=>{
        return(
            <div className="col-md-auto">
                {item}
            </div>
        )
    })
    return (
        <div className="row">
            <div className="col pb-2 mt-4 mb-2 border-bottom">
                <div className="row">
                    <div className="col">
                        <h3>{props.title}</h3>
                    </div>
                    {buttons}
                </div>
            </div>
        </div>  
    )
}