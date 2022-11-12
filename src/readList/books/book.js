import React from 'react';
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert' 
import Col from 'react-bootstrap/Col'
import {
    openSignIn,
    bookSetLoadingState,
    openUpdateBook,
    openReadList
} from '../../redux/actionCreators'

class Book extends React.Component{

    constructor(props){
		super(props);
        this.state={
            isLoaded:false,
            error:null,
            data:null
        };
    
    }

    async loadData(){
        let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/books/${this.props.store.bookId}`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`
			}
        });
        if (!res.ok){
            let result=await res.json();
            throw new Error('Error: '+result.errorMessage);
        };
        let book = await res.json();

        return book;       

    }

    async performDelete(){
        let res = await fetch(
            window.env.BACKEND_ADDR_V2+"/api/v0.2/books/"+this.props.store.bookId,
            {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer '+this.props.store.JWT
                }
            }
        );
        if (!res.ok){
            let result=await res.json();
            throw new Error('Error: '+result.errorMessage);
        };
    }

    load(){
        this.loadData()
        .then(result =>{
            this.setState({
                isLoaded:true,
                error:null,
                data: result
            });
        })
        .catch(
            error => {
                this.setState({
					isLoaded:true,
					error:error.message,
					data: null
				});
        });
    }

    deleteBook(){
        this.performDelete()
        .then(
            res=>{
                this.props.openReadList();
            }
        )
        .catch(
            error => {
                alert(error);
        });
    }

    componentDidMount(){
		this.load();
        // this.loadBook();
        
    }
    
    render(){
        let displayResult;
        if (this.state.error){
            displayResult=( <div class="alert alert-danger" role="alert">{this.state.error}</div>);
        } else if (!this.state.isLoaded){
            displayResult=( 
            <div class="d-flex justify-content-center">
            <div class="spinner-border m-5" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            </div>);
        } else {
            let createDate=this.state.data.insertDate;
            createDate = new Date(createDate);
            createDate = createDate.getDate().toString().padStart(2,"0")
                +"."+(createDate.getUTCMonth()+1).toString().padStart(2,"0")
                +"."+createDate.getFullYear()
                +" "+createDate.getHours().toString().padStart(2,"0")
                +":"+createDate.getMinutes().toString().padStart(2,"0")
                +":"+createDate.getSeconds().toString().padStart(2,"0");
            displayResult=(
                <div class="row">
                    <div class="col ">
                        <div class="row">
                            <div class="col pb-2 mt-4 mb-2 border-bottom">
                                <div class="row">
                                    <div class="col">
                                        <h3>{this.state.data.title}</h3>
                                    </div>
                                    <div class="col-md-auto">
                                        <button
                                            type="button"
                                            class="btn btn-secondary btn-sm"
                                            onClick={()=>{
                                                alert('Not Implemented');
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
                                                    // alert('Not Implemented');
                                                    this.props.openUpdateBook();
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
                                                const isDelete = window.confirm("Delete this book?")
                                                if (isDelete){
                                                    this.deleteBook();
                                                }
                                                // this.deleteTitle(this.props.store.titleId);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col ml-2">
                                <div class="row">
                                    <div class="col">
                                        <h5>Author</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        {/* <p>{this.state.data.book.author ? this.state.data.book.author.name : "N/A"}</p> */}
                                        <p>{this.state.data.authors.length > 0 ? this.state.data.authors[0].name : "N/A"}</p>
                                    </div>                            
                                </div>
                                <div class="row mt-2">
                                    <div class="col">
                                        <h5>Status</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        {/* <p>{this.state.data.book.bookStatus.name}</p> */}
                                        <p>{this.state.data.bookStatus.statusName}</p>
                                    </div>                            
                                </div>   
                                <div class="row  mt-2">
                                    <div class="col">
                                        <h5>Series</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        <p>{this.state.data.series.length > 0 ? this.state.data.series[0].title: "N/A"}</p>
                                    </div>                            
                                </div> 
                                <div class="row  mt-2">
                                    <div class="col">
                                        <h5>Order</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        <p>{this.state.data.series.length > 0 ? this.state.data.series[0].seriesOrder: "N/A"}</p>
                                        {/* <p>{"N/A"}</p> */}
                                    </div>                            
                                </div> 
                                <div class="row  mt-2">
                                    <div class="col">
                                        <h5>Last chapter</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        <p>{this.state.data.lastChapter ? this.state.data.lastChapter:"N/A"}</p>
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

                                <div class="row  mt-2">
                                    <div class="col">
                                        <h5>Book Type</h5>
                                    </div>
                                </div>
                                <div class="row border-bottom">
                                    <div class="col ml-2">
                                        <p>{this.state.data.bookType ? this.state.data.bookType.typeName:"--"}</p>
                                    </div>                            
                                </div> 

                            </div> 
                        </div>              


                    </div>
                </div>
                
            )
        }
        return (
            <div>
            {displayResult}
            </div>
        )
    }


}

// export default Book;

const mapStatetoProps = (state) => {
	return {
		store: {
			JWT: state.JWT,
			listId: state.listId,
            bookId: state.book.bookId,
		}
	};
}

export default connect(
        mapStatetoProps,
        {
            openSignIn,
            // bookSetLoadingState,
            openUpdateBook,
            openReadList
        }
        
	)(Book)