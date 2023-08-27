export default function GamesListRow(props){
    const title = props.title;
    const createDateUTC = props.createDateUTC;

    return (
        <div class="row" >
            <div class="col">
                <div 
                    class="row justify-content-between"
                >
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <p class="font-weight-bold">{title}</p>
                            </div>
                        </div>							
                        <div class="row">
                            <div class="col">Added: {createDateUTC}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}