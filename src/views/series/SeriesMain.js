import React from 'react'
import SeriesList from './list'
import SeriesItem from './item'
import SeriesAdd from './addSeries'
import * as panels from '../panels'
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