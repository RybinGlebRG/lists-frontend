import React from 'react'
import SeriesList from './list.js'
import SeriesItem from './item.js'
import SeriesAdd from './addSeries.js'
import * as panels from '../panels.js'
import { connect} from 'react-redux';

class SeriesMain extends React.Component {
    constructor(props){
		super(props);
		this.state={}
    }

    render(){
		let res;

		if (this.props.store.panelType===panels.SERIES_LIST){
			res=(<SeriesList/>)
		} else if (this.props.store.panelType===panels.SERIES_ITEM){
			res=(<SeriesItem/>)
		}else if (this.props.store.panelType===panels.SERIES_ADD){
			res=(<SeriesAdd/>)
		}
        return(
			<div class="row">
				<div class="col">
					{res}
				</div>
			</div>
		)
    }

}

const mapStatetoProps = (state) => {
	return {
		store: {
			panelType: state.listsReducer.panel
		}
	};
}
export default connect(
	mapStatetoProps,
	{ }
  )(SeriesMain)