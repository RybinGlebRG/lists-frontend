export default function Header(props){
    let buttons = props.buttons.map(item=>{
        return(
            <div class="col-md-auto">
                {item}
            </div>
        )
    })
    return (
        <div class="row">
            <div class="col pb-2 mt-4 mb-2 border-bottom">
                <div class="row">
                    <div class="col">
                        <h3>{props.title}</h3>
                    </div>
                    {buttons}
                </div>
            </div>
        </div>  
    )
}