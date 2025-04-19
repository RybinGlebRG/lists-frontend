import * as dateUtils from '../../../utils/dateUtils'
import * as statuses from '../statuses.js';

export default function ReadingRecordList(props){
    const readingRecords = props.readingRecords;

    let records = readingRecords.map(item => {
        return(
            // <li class="list-group-item">{statuses.getStatusSVG({statusName: item.bookStatus.statusName})} {dateUtils.formatToDisplay(item.startDate)} - {dateUtils.formatToDisplay(item.endDate)}</li> 
            <li class="list-group-item">
                <div class="row">
                    <div class="col-md-auto">
                        {statuses.getStatusSVG({statusName: item.bookStatus.statusName})}
                    </div>
                    <div class="col-md-auto">
                        {dateUtils.formatToDisplay(item.startDate)} - {item.endDate != null ? dateUtils.formatToDisplay(item.endDate) : "null"}
                    </div>
                    <div class="col-md-auto">
                        <div class="vr"></div>
                    </div>
                    <div class="col-md-auto">
                        chapter: {item.lastChapter}
                    </div>
                </div>
            </li>
        )
    });
    let res=(
        <div class="row border-bottom">
            <div class="col">
                <div class="row mt-2">
                    <div class="col">
                        <h5>Reading records</h5>
                    </div>
                </div>
                <ul class="list-group list-group-flush">
                    {records}                          
                </ul> 
            </div>
        </div>
    )

    return res;
}