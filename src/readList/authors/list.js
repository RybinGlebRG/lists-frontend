import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert'
import {openSignIn, openAuthor, openAuthorAdd} from '../../redux/actionCreators';
import { connect } from 'react-redux';

class AuthorList extends React.Component {

    constructor(props){
		super(props);
		this.state={
			isLoaded:false,
			data:null,
			error:null
		};
	}

	async loadData(){
		let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/authors`,
		{
			method: "GET",
			headers: {
				'Authorization': 'Bearer '+this.props.store.JWT
			}
		});
		if (!res.ok){
            throw new Error('Some network error');
        };
		let authorList = await res.json();	

		return authorList;
	
	}

    loadList(){
		this.loadData()
		.then(res=>{
			this.setState({
				isLoaded:true,
				error:null,
				data: res
			});
		})
		.catch(err=>{
			this.setState({
				isLoaded:true,
				error:err.message,
				data: null
			});
		});
	}

    componentDidMount(){
		this.loadList()
	}
    
    renderTableData(){
		return this.state.data.items.map((item) =>{
			return (
					<li class="list-group-item d-flex justify-content-between list-group-item-action" 
						action 
						onClick={() => {
							this.props.openAuthor(item.authorId);
						}}						
					>
						{item.name}
						{/* <span class="badge badge-primary badge-pill">
							{item.bookCount}
						</span> */}
					</li>
			)
			 
		}
		
		)
	}

	

    render(){
		let displayPanel;

		if (this.state.error){
			displayPanel=( 
				<Alert variant='danger'>{this.state.error}</Alert>
			);
		} else if (!this.state.isLoaded){
			displayPanel=( 
				<div class="d-flex justify-content-center">
					<div class="spinner-border m-5" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			  );
		} else {
			displayPanel=(	
				<ListGroup>
					{this.renderTableData()}
				</ListGroup>
			);
		}
		return (
			<div>
				<div class="row">
					<div class="col pb-5">
						<div class="row">
							<div class="col pb-2 mt-4 mb-2 border-bottom">
								<div class="row">
									<div class="col">
										<h3>Author list</h3>
									</div>
									<div class="col-md-auto">
										<button 
											type="button"
											class="btn btn-secondary btn-sm"
												onClick={()=>{
													alert("Not implemented");
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
													this.props.openAuthorAdd();
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
							<div class="col">
								{displayPanel}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
    }
}

// export default SeriesList;
const mapStatetoProps = (state) => {
	return {
		store: {
			JWT: state.JWT,
			listId: state.listId
		}
	};
}
export default connect(
	mapStatetoProps,
	{ openSignIn,openAuthor,openAuthorAdd}
  )(AuthorList)