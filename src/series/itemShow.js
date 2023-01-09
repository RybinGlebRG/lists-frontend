import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';
import {
    openBookV2,
    // seriesItemSetLoadingState,
    openSignIn,
    // openSeriesEdit,
    seriesItemAddBook
} from '../redux/actionCreators'
import {
	openSeriesEdit
} from './seriesSlice'

class SeriesItemShow extends React.Component{
    constructor(props){
		super(props);
		this.state={
			error: null,
            isLoaded: false,
            series: null
        };
    }

    


    async loadData(){
        let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.readListId}/series/${this.props.store.seriesId}`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`
			}
        });
        let result;
        if (!res.ok){
            result=await res.json();
            throw new Error('Error: '+result.error);
        };

        let series = await res.json();

        // let books = []
        // for await (const item of series.books ){
        //     res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.readListId}/books/${item.bookId}`,
        //     {
        //         method: "GET",
        //         headers: {
        //             'Authorization': `Bearer ${this.props.store.JWT}`
        //         }
        //     });
        //     if (!res.ok){
        //         let result=await res.json();
        //         throw new Error('Error: '+result.error);
        //     };

        //     let book = await res.json();
        //     books.push(book);
        // }

        let out= {
            series
        }

        return out;
    }

    componentDidMount(){
		this.loadData()
        .then(result =>{
            this.setState({
                series: result.series,
                isLoaded: true
            });  
        })
        .catch(
            error => {
                this.setState({
                    error: error.error,
                    isLoaded: true
                });
        });
    }

    async performDeleteSeries(){
        let res = await fetch(
            window.env.BACKEND_ADDR_V2+"/api/v0.2/bookSeries/"+this.props.store.seriesId,
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

    deleteSeries(){
        this.performDeleteSeries()
        .then(
            res=>{
                this.props.openSeriesList();
            }
        )
        .catch(
            error => {
                alert(error.message);
        });
    }

    renderTableData(){
        let displayResult;
        if (this.state.error){
            displayResult=( <div class="alert alert-danger" role="alert">{this.state.error}</div>);
        } else if (!this.state.isLoaded){
            displayResult=( 
            <div class="d-flex justify-content-center">
            <div class="spinner-border m-5" role="status">
                <span class="sr-only"/>
            </div>
            </div>);
        } else {
            
            let items =this.state.series.items.map(item =>{
                let badge;
                if (item.bookStatus.statusName==='Completed'){
                    badge=(
                        <span class="badge text-bg-success rounded-pill">
                            {item.bookStatus.statusName}
                        </span>
                    )
                } else if (item.bookStatus.statusName==='In Progress') {
                    badge=(
                        <span class="badge rounded-pill text-bg-warning">
                            {item.bookStatus.statusName}
                            
                            
                            {item.lastChapter !== undefined ? (
                                <span class="badge text-bg-secondary rounded-pill ml-1 ms-1">Ch. {item.lastChapter}</span>
                            ): null
                            }
                        </span>
                    )
                }
                return (
                        <li class="list-group-item d-flex justify-content-between list-group-item-action"
                            action 
                            onClick={()=>{
                                this.props.openBookV2(item.bookId)
                            }}
                        >
                            {item.title}
                            {badge}
                        </li>
                )
                 
            }
            
            )

            let header = (
                <div>
                    <div class="mb-4 mt-4 border-bottom">
                        <div class="row">
                            <div class="col">
                                <div class="pb-0 mt-3 mb-2 ">
                                    <h2>{this.state.series.title}</h2>
                                </div>
                            </div>
                            {/* <div class="col-md-auto">
                                <button 
                                    type="button"
                                    class="btn btn-success btn-sm"
                                    onClick={()=>{
                                        this.props.seriesItemAddBook(this.state.series.seriesId);
                                    }}
                                >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                        </svg>
                                </button>
                            </div> */}
                            <div class="col-md-auto">
                                <button 
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    onClick={()=>{
                                        this.props.openSeriesEdit(this.props.store.seriesId);
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
                                        const isDelete = window.confirm("Delete this series?")
                                        if (isDelete){
                                            this.deleteSeries();
                                        }
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
            )
    
            displayResult=(
                <div class="row">
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    {header}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <ul class="list-group">
                                        {items}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            )

        }

       


		return (
            <div class="row">
                <div class="col">
                    {displayResult}
                </div>
            </div>
        )
	}

    render(){
        return (
            <div class="row">
                <div class="col">
                    {this.renderTableData()}
                </div>
            </div>
        )
    }

}

const mapStatetoProps = (state) => {   
    return {
        store: {
            readListId: state.listsReducer.listId,
            seriesId: state.listsReducer.seriesItem.seriesId,
            JWT: state.listsReducer.JWT
        }
    };
}

export default connect(
    mapStatetoProps,
    { 
        openBookV2,
        openSignIn,
        openSeriesEdit,
        seriesItemAddBook
    }
)(SeriesItemShow)