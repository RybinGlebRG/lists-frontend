import ReadingRecord from "./ReadingRecord";

export default function ReadingRecordList({list, handleChange}){

    let res;

    res=(
        <div class="row">
            <div class="col">
                <ul class="list-group">
                    {list.map(item => {
                        return(
                            <li 
                                class="list-group-item p-0"
                                key={item.startDate}
                            >
                                <ReadingRecord 
                                    record={item}
                                    handleChange={handleChange}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>	
    )
    

    return res;
}