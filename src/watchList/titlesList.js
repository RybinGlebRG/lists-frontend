import React from 'react';
import { Row, Col, ListGroup, Alert, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {openAddTitle, openTitle} from '../redux/actionCreators';


class TitlesList extends React.Component{
    constructor(props){
		super(props);
		this.state={
			isLoaded: false,
			error: null,
			data: null
		};
	}

	loadTitlesList(){
		this.setState({
			isLoaded:false,
			error:null
		});
		fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/watchLists/${this.props.store.watchListId}/titles`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`
			}
        })
        .then(
            res => {
                if (!res.ok){
                    throw new Error('Some network error');
                }
                return res.json();
            })
        .then(
            res => {
				this.setState({
					isLoaded:true,
					error:null,
					data: res
				});
            }
        )
        .catch(
            error => {
				this.setState({
					isLoaded:true,
					error:error,
					data: null
				});
        });

	}

	
	
	componentDidMount(){
		this.loadTitlesList();
	}
	
	renderTitlesListData(){
		return this.state.data.titles.map((item) =>{
			let createDate=item.create_date_utc;
			createDate = new Date(createDate);
			createDate = createDate.getDate().toString().padStart(2,"0")
                +"."+(createDate.getUTCMonth()+1).toString().padStart(2,"0")
                +"."+createDate.getFullYear()
                +" "+createDate.getHours().toString().padStart(2,"0")
                +":"+createDate.getMinutes().toString().padStart(2,"0")
                +":"+createDate.getSeconds().toString().padStart(2,"0");
			return (
					<li class="list-group-item d-flex justify-content-between list-group-item-action"
						action
						onClick={() => {
							this.props.openTitle(item.id);
						}} 
					>
						<div class="row">
							<div class="col">
								<div class="row">
									<div class="col">
										<p class="font-weight-bold">{item.name}</p>
									</div>
								</div>
								<div class="row">
									<div class="col">Status: {item.statusId === 2 ? "Completed" : "In progress"}</div>
								</div>
								<div class="row">
									<div class="col">Type: {item.videoType.name}</div>
								</div>
								<div class="row">
									<div class="col">Added: {createDate}</div>
								</div>
							</div>
						</div>

					</li>




			);
			 
		}
		
		)
	}
    
    render(){
		let displayPanel;

		if (this.state.error){
			displayPanel=( 
				<Alert variant='danger'>Error</Alert>
			);
		} else if (!this.state.isLoaded) {
			displayPanel=( 
				<div class="d-flex justify-content-center">
					<div class="spinner-border m-5" role="status">
						<span class="sr-only"></span>
					</div>
				</div>
			);
		} else {
			displayPanel=(	
				<ListGroup>
					{this.renderTitlesListData()}
				</ListGroup>
			);
		}

        return(
			<Row>
				<Col>		
					<Row>
						<Col  bsPrefix="col pb-2 mt-4 mb-2 border-bottom">
							<Row>
								<Col>
									<h3>Titles</h3>
								</Col>
								<div class="col-md-auto">
									<button 
										type="button"
										class="btn btn-secondary btn-sm"
											onClick={()=>{
												this.loadTitlesList();
											}}
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
											<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
										</svg>
								</button>
								</div>
								<div class="col-md-auto">
									<button 
										type="button"
										class="btn btn-success btn-sm"
											onClick={()=>{
												this.props.openAddTitle();
											}}
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
											<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
										</svg>
								  </button>
								</div>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col>
							{displayPanel}
						</Col>
					</Row>
				</Col>
			</Row>
        )
    }

}

const mapStatetoProps = (state) => {
	return {
		store: {
			JWT: state.listsReducer.JWT,
			watchListId: state.listsReducer.watchListId,
			data: state.listsReducer.titlesList.data
		}
	};
}

export default connect(
	mapStatetoProps,
	{
		openAddTitle,
		openTitle
	}
)(TitlesList)