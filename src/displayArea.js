import React from 'react';
import ReadList from './readList/readList'
import WatchList from './watchList/watchList'
import SeriesMain from './series/SeriesMain'
import Header from './header.js'
import LoginPanel from './login/login.js'
import { connect } from 'react-redux'
import {SIGN_IN} from './panels.js'
import * as categories from './displayAreaCategories'
import Metrics from './metrics/metrics'
import Games from './games/main';




class DisplayArea extends React.Component{
	constructor(props){
		super(props);
		this.state={}
		// this.setUser=this.setUser.bind(this)
	}

	// setUser(user){
	// 	this.setState({
	// 		user:user
	// 	})
	// }


	renderBody(){

		let list;
		if (this.props.store.category === categories.READ_LIST){
			list = (<ReadList/>)
		} else if (this.props.store.category === categories.WATCH_LIST){
			list = (<WatchList/>)
		} else if (this.props.store.category === categories.SERIES_MAIN) {
			list = (<SeriesMain/>)
		} else if (this.props.store.category === categories.GAMES) {
			list = (<Games/>)
		} else {
			list= (<Metrics/>)
		}

		return (
			<div class="row">
				<div class="col">
					<div class="row">
						<div class="col">
							<Header/>
						</div>
					</div>
					<div class="row">
						<div class="col">
							{list}
						</div>	
					</div>
				</div>
			</div>
		)
	}
	
	
	render(){

		let displayPanel;

		if (this.props.store.panelType === SIGN_IN){
			displayPanel=(
				<LoginPanel/>
			)
		} else {
			displayPanel=(
				<div class="row">
					<div class="col">
						{this.renderBody()}
					</div>
				</div>
			)	
		}

		return (
			<div class="container-fluid h-100">
				{displayPanel}
			</div>
		)
		
	}
}

const mapStatetoProps = (state) => {
	return {
		store: {
			panelType: state.listsReducer.panel,
			listType: state.listsReducer.listType,
			category: state.displayAreaReducer.category
		}
	};
}

export default connect(
		mapStatetoProps
	)(DisplayArea)