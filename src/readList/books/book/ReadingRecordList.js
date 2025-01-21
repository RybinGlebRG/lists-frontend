import useReadingRecords from './useReadingRecords';
import * as dateUtils from '../../../utils/dateUtils'
import * as statuses from '../statuses.js';

export default function ReadingRecordList(props){
    const bookId = props.bookId;
    const {error, isLoaded, readingRecords } = useReadingRecords({bookId: bookId});

    let res;
    if (error){
        res=( <div class="alert alert-danger" role="alert">{error}</div>);
    } else if (!isLoaded){
        res=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                    <span class="sr-only"/>
                </div>
            </div>
        );
    } else {
        let records = readingRecords.items.map(item => {
            return(
                // <li class="list-group-item">{statuses.getStatusSVG({statusName: item.bookStatus.statusName})} {dateUtils.formatToDisplay(item.startDate)} - {dateUtils.formatToDisplay(item.endDate)}</li> 
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-auto">
                            {statuses.getStatusSVG({statusName: item.bookStatus.statusName})}
                        </div>
                        <div class="col">
                            {dateUtils.formatToDisplay(item.startDate)} - {item.endDate != null ? dateUtils.formatToDisplay(item.endDate) : "null"}
                        </div>
                    </div>
                </li>
            )
        });
        res=(
            <div class="row">
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
    }

    return res;
}