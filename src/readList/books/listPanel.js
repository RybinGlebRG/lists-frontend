import React from 'react';
import { connect } from 'react-redux'
import {
    openSignIn,
    bookSetLoadingState,
    openBookV2,
	setBookListReload
} from '../../redux/actionCreators'


class ListPanel extends React.Component{
	constructor(props){
		super(props);
		this.state={
			switchPanelTo:null,
			listId:this.props.listId,
			bookOrdering: "DESC",
			error: null,
			isLoaded: false,
			list: {}
			// isShouldReload:false
			
		}
	}

	componentDidMount(){
		this.loadList()
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
					ordering: this.state.bookOrdering
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

	switchOrdering(){
		if (this.state.bookOrdering==="DESC"){
			this.setState({
				bookOrdering:"ASC"
			});
		} else {
			this.setState({
				bookOrdering:"DESC"
			});
		}
		this.props.setBookListReload(true);
	}

	getTableData(){
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
						<span class="sr-only"/>
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


	getControls(){
		let bookOrdering;

		if (this.state.bookOrdering==="DESC"){
			bookOrdering = (
				<button 
						type="button"
						class="btn btn-secondary btn-sm"
							onClick={()=>{
								this.switchOrdering();
							}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
							<path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
						</svg>
				</button>
			)
		} else {
			bookOrdering = (
				<button 
						type="button"
						class="btn btn-secondary btn-sm"
							onClick={()=>{
								this.switchOrdering();
							}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16">
							<path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
						</svg>
				</button>
			)
		}

		let controls=(
			<div class="row">
				<div class="col">
				<div class="row">
					<div class="col pb-2 mt-4 mb-2 border-bottom">			
						<div class="row">
							<div class="col">
								<h3>Book List</h3>
							</div>
							<div class="col-md-auto">
									<button 
										type="button"
										class="btn btn-secondary btn-sm"
											onClick={()=>{
												this.props.setBookListReload(true);
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
												this.props.openAddBook();
											}}
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
											<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
										</svg>
								  </button>
								</div>
						</div>
						
					</div>	
				</div>
				<div class="row">
					<div class="col pb-2 mt-2 mb-2 border-bottom">
						{bookOrdering}
					</div>
				</div>
				<div class="row">
					<div class="col">
						{this.getTableData()}
					</div>
				</div>			
				</div>
			</div>
		)

		return controls;
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
								{item.bookType ? (
									<div class="row">
									<div class="col">Type: {item.bookType.typeName}</div>
								</div>
								) : null}								
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
		
		return this.getControls();
		
	}
}


// export default ListPanel;

const mapStatetoProps = (state) => {   
    return {
        store: {
            listId: state.listId,
            seriesId: state.seriesItem.seriesId,
            JWT: state.JWT,
            list: state.seriesItem.list,
            error: state.seriesItem.error,
            isLoaded: state.seriesItem.isLoaded,
            isAdd: state.seriesItem.isAdd,
			isReload: state.bookList.isReload
        }
    };
}

export default connect(
	mapStatetoProps,
	{
		openSignIn,
		bookSetLoadingState,
		openBookV2,
		setBookListReload
	}
	
)(ListPanel)