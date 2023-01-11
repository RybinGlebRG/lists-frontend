import React from 'react';
import ReadList from './readList/readList'
import WatchList from './watchList/watchList'
import SeriesMain from './series/SeriesMain'
import Header from './header.js'
import LoginPanel from './login/login.js'
import { connect } from 'react-redux'
import {SIGN_IN} from './panels.js'




class DisplayArea extends React.Component{
	constructor(props){
		super(props);
		this.state={}
		this.setUser=this.setUser.bind(this)
	}

	setUser(user){
		this.setState({
			user:user
		})
	}


	renderBody(){

		let list;
		if (this.props.store.listType === "readList"){
			list = (<ReadList/>)
		} else if (this.props.store.listType === "watchList"){
			list = (<WatchList/>)
		} else {
			list = (<SeriesMain/>)
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
			listType: state.listsReducer.listType
		}
	};
}

export default connect(
		mapStatetoProps
	)(DisplayArea)