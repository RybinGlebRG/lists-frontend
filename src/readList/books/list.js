import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, ListGroup, Alert, Button, Form } from 'react-bootstrap';
import {
    openSignIn,
    openBookV2,
	setBookListReload
} from '../../redux/actionCreators'


class List extends React.Component{
	constructor(props){
		super(props)
		this.state={
			error: null,
			isLoaded: false,
			list: {},
			// listId:this.props.listId
		}
		// this.loadList=this.loadList.bind(this);
		// this.clearList=this.clearList.bind(this);
	}

	clearList(){
		this.setState({
			list:{},
			isLoaded:false,
			error:null
		})
	}

	async loadData(){
		let body={
			sort:[{
				field:"createDate",
				ordering: "DESC"
			}]
		}

		let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/books/search`,
		{
			method: "POST",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(body)
        });
		if (!res.ok){
			let result=await res.json();
            throw new Error('Error: '+result.errorMessage);
        };
		let bookList = await res.json();	
		return bookList;
	
	}

	loadList(){
		this.loadData()
		.then(res=>{
			this.setState({
				isLoaded:true,
				error:null,
				list: res.items
			});
		})
		.catch(err=>{
			this.setState({
				isLoaded:true,
				error:err.message,
				list: null
			});
		});
	}
	
	// loadList(){
	// 	fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/books`,
	// 	{
	// 		method: "GET",
	// 		headers: {
	// 			'Authorization': `Bearer ${this.props.store.JWT}`
	// 		}
    //     })
	// 	.then(
	// 		res=>{
	// 			if (!res.ok){
	// 				throw new Error('Some network error');
	// 			};
	// 			return res.json();
	// 		}
	// 	)
	// 	.then(
	// 		res =>{
	// 			this.setState({
	// 				isLoaded: true,
	// 				list: res.items
	// 			});
	// 		}
	// 	)
	// 	.catch(
	// 		err =>{
	// 			// this.setState({
	// 			// 	isLoaded: true,
	// 			// 	error: err
	// 			// });
	// 		}
	// 	)
		
	// }

	
	componentDidMount(){
		this.loadList()
	}
	
	renderTableData(){
		return this.state.list.map((item) =>{
			let createDate=item.insertDate;
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
							this.props.openBookV2(item.bookId);
						}} 
					>
						<div class="row">
							<div class="col">
								<div class="row">
									<div class="col">
										<p class="font-weight-bold">{item.title}</p>
									</div>
								</div>
								<div class="row">
									<div class="col">Status: {item.bookStatus.statusName}</div>
								</div>
								{item.lastChapter ? (
								<div class="row">
									<div class="col">Last chapter: {item.lastChapter}</div>
								</div>
								): null}
								<div class="row">
									<div class="col">Added: {createDate}</div>
								</div>
							</div>
						</div>

					</li>
			)
			 
		}
		
		)
	}
	
	render(){
		if (this.props.store.isReload) {
			this.clearList();
			this.loadList();
			// this.props.changeReloaded(false);
			this.props.setBookListReload(false);
		}
		
		if (this.state.error){
			return <div class="alert alert-danger" role="alert">{this.state.error}</div>;
		} else if (!this.state.isLoaded){
			return(
				<div class="d-flex justify-content-center">
					<div class="spinner-border m-5" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			)
		} else {
		return(
			<ul class="list-group">
					{this.renderTableData()}
			</ul>
		);
		}
	}
}

const mapStatetoProps = (state) => {   
    return {
        store: {
            listId: state.listId,
            // seriesId: state.seriesItem.seriesId,
            JWT: state.JWT,
			isReload: state.bookList.isReload
            // list: state.seriesItem.list,
            // error: state.seriesItem.error,
            // isLoaded: state.seriesItem.isLoaded,
            // isAdd: state.seriesItem.isAdd
        }
    };
}

export default connect(
	mapStatetoProps,
	{
		openSignIn,
		openBookV2,
		setBookListReload
	}
	
)(List)