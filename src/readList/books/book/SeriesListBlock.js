import {useDispatch } from 'react-redux'
import {openSeriesItem as openSeriesItemSlice} from '../../../series/seriesSlice'
import {openSeriesItem} from '../../../redux/actionCreators'
import {openSeriesList} from '../../../displayAreaSlice'

export default function SeriesListBlock(props){
    const dispatch = useDispatch();
    const seriesList = props.seriesList;

    let display;
    if (seriesList.length > 0){
        display = seriesList.map(item=>{
            return (
                <div class="row">
                    <div class="col ml-2">
                        <a 
                            href="#"
                            role="button"
                            onClick={() => {
                                // onOpenSeriesItem(item.seriesId);
                                // this.props.openSeriesItemSlice();
                                dispatch(openSeriesItemSlice());
                                // this.props.openSeriesItem(seriesId);
                                dispatch(openSeriesItem(item.seriesId));
                                // this.props.openSeriesList();
                                dispatch(openSeriesList());
                            }}
                        ><p>{item.title}</p></a>
                    </div>
                </div>
            )
        })
    } else {
        <div class="row">
            <div 
                class="col ml-2"
            >
                <p>--</p>
            </div> 
        </div>
    }
    return (
        <div>
            {display}
        </div>
    )
}