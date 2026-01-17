import React from 'react';
import { Row, Col, Alert} from 'react-bootstrap'
import { connect } from 'react-redux'
import {openTitlesList, openUpdateTitle} from '../dao/redux/actionCreators';

class Title extends React.Component{
    constructor(props){
		super(props);
		this.state={
            isLoaded: false,
			error: null,
			data: null
        }
    }

    loadTitle(){
        this.setState({
			isLoaded:false,
			error:null
		});
		fetch(window.location.origin+`/api/v0.2/watchLists/${this.props.store.watchListId}/titles/${this.props.store.titleId}`,
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
					error:error.message,
					data: null
				});
        });
    }

    deleteTitle(titleId){
		const isDelete = window.confirm("Delete this title?")
		if (isDelete){
			fetch(
				window.location.origin+`/api/v0.2/titles/${titleId}`,
				{
					method: "DELETE",
					headers: {
						'Authorization': `Bearer ${this.props.store.JWT}`
					}
				}
			).then(
				res => {
					if (!res.status===200){
						throw new Error('Some error');
					}
				}
            ).then (
                () => {
                    this.props.openTitlesList();
                }
			).catch(
					error => {
						this.setState({
							isLoaded:true,
							error:error.message,
							data: null
						});
				}
			);
			
		}
		
	}

    componentDidMount(){
		this.loadTitle();
	}

    render(){
        let displayPanel;

		if (this.state.error){
			displayPanel=( 
				<Alert variant='danger'>{this.state.error}</Alert>
			);
		} else if (!this.state.isLoaded) {
			displayPanel=( 
				<div class="d-flex justify-content-center">
					<div class="spinner-border m-5" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			);
		} else {
            let createDate=this.state.data.create_date_utc;
            createDate = new Date(createDate);
            createDate = createDate.getDate().toString().padStart(2,"0")
                +"."+(createDate.getUTCMonth()+1).toString().padStart(2,"0")
                +"."+createDate.getFullYear()
                +" "+createDate.getHours().toString().padStart(2,"0")
                +":"+createDate.getMinutes().toString().padStart(2,"0")
                +":"+createDate.getSeconds().toString().padStart(2,"0");
			displayPanel=(	
				<Row>
                    <Col>
                        <Row>
                            <Col  bsPrefix="col pb-2 mt-4 mb-2 border-bottom">
                                <Row>
                                    <Col>
                                        <h3>{this.state.data.name}</h3>
                                    </Col>
                                    <div class="col-md-auto">
                                        <button
                                            type="button"
                                            class="btn btn-secondary btn-sm"
                                            onClick={()=>{
                                                this.loadTitle();
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
                                            class="btn btn-danger btn-sm"
                                                onClick={()=>{
                                                    this.props.openUpdateTitle();
                                                }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="col-md-auto">
                                        <button 
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                            onClick={()=>{
                                                this.deleteTitle(this.props.store.titleId);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <div class="row">
                            <div class="col ml-2">
                                <div class="row">
                                    <div class="col">
                                        <h5>Status</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        <p>{this.state.data.statusId === 2? "Completed" : "In progress"}</p>
                                    </div>                            
                                </div>
                                <div class="row  mt-2">
                                    <div class="col">
                                        <h5>Type</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        <p>{this.state.data.videoType ? this.state.data.videoType.name : null}</p>
                                    </div>                            
                                </div>   
                                <div class="row  mt-2">
                                    <div class="col">
                                        <h5>Create date UTC</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col ml-2">
                                        <p>{createDate}</p>
                                    </div>                            
                                </div> 
                            </div> 
                        </div>            
                    </Col>
                </Row>
			);
		}

        return(
            <Row>
                <Col>
                    {displayPanel}
                </Col>
            </Row>
            
        )
    }
}

const mapStatetoProps = (state) => {
	return {
		store: {
			titleId: state.listsReducer.title.titleId,
            JWT: state.listsReducer.JWT,
			watchListId: state.listsReducer.watchListId
		}
	};
}

export default connect(
    mapStatetoProps,
    {
        openTitlesList,
        openUpdateTitle
    }
)(Title)