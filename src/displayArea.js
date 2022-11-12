import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReadList from './readList/readList'
import WatchList from './watchList/watchList'
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
		let header=(
			<Header/>
		)

		let list;
		if (this.props.store.listType === "readList"){
			list = (<ReadList/>)
		}
		else {
			list = (<WatchList/>)
		}

		return (
			<Row>
				<Col>
					<Row>
						<Col>
							{header}
						</Col>
					</Row>
					<Row>
						<Col>
							{list}
						</Col>	
					</Row>
				</Col>
			</Row>
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
				<Row>
					<Col>
						{this.renderBody()}
					</Col>
				</Row>
			)	
		}

		return (
			<Container fluid className="h-100">
				{displayPanel}
			</Container>
		)
		
	}
}

const mapStatetoProps = (state) => {
	return {
		store: {
			panelType: state.panel,
			listType: state.listType
		}
	};
}

export default connect(
		mapStatetoProps
	)(DisplayArea)