import {useDispatch } from 'react-redux'
import {openSeriesItem as openSeriesItemSlice} from '../../../dao/series/seriesSlice'
import {openSeriesItem} from '../../../dao/redux/actionCreators'
import {openSeriesList} from '../../../dao/displayAreaSlice'

export default function SeriesListBlock(props){
    const dispatch = useDispatch();
    const seriesList = props.seriesList;

    let display;
    if (seriesList && seriesList.length > 0){
        display = seriesList.map(item=>{
            return (
                <div className="row">
                    <div className="col ml-2">
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
        display = (
        <div className="row">
            <div 
                className="col ml-2"
            >
                <p>--</p>
            </div> 
        </div>
        )
    }
    return (
        <div>
            {display}
        </div>
    )
}