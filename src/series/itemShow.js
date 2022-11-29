import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';
import {
    openBookV2,
    seriesItemSetLoadingState,
    openSignIn
} from '../redux/actionCreators'

class SeriesItemShow extends React.Component{
    constructor(props){
		super(props);
		this.state={
			error: null,
            isLoaded: false,
            series: null,
            books: null
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

        let books = []
        for await (const item of series.books ){
            res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.readListId}/books/${item.bookId}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${this.props.store.JWT}`
                }
            });
            if (!res.ok){
                let result=await res.json();
                throw new Error('Error: '+result.error);
            };

            let book = await res.json();
            books.push(book);
        }

        let out= {
            series,
            books
        }

        return out;
    }

    // loadItem(){
    //     let seriesItemApi = new SeriesItemApi(this.props.openSignIn);
    //     seriesItemApi.getBooks(
    //         this.props.store.listId,
    //         this.props.store.seriesId,
    //         this.props.store.JWT,
    //         (result) => {
    //             this.props.seriesItemSetLoadingState(null, true, result)

    //         },
    //         (error) => {
    //             this.props.seriesItemSetLoadingState(error, true, {})
    //         }


    //     );
    // }

    componentDidMount(){
		this.loadData()
        .then(result =>{
            this.setState({
                series: result.series,
                books: result.books,
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

    renderTableData(){
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
            displayResult=this.state.books.map(item =>{
                let badge
                if (item.bookStatus.statusName==='Completed'){
                    badge=(
                        <span class="badge badge-success badge-pill">
                            {item.bookStatus.statusName}
                        </span>
                    )
                } else if (item.bookStatus.statusName==='In Progress') {
                    badge=(
                        <span class="badge badge-warning badge-pill ">
                            {item.bookStatus.statusName}
                            
                            
                            {item.lastChapter !== undefined ? (
                                <span class="badge badge-secondary badge-pill ml-1">
                                Ch. {item.lastChapter}
                            </span>
                            ): null
                            }
                        </span>
                    )
                }
                return (
                        <ListGroup.Item 
                            action 
                            bsPrefix="list-group-item d-flex justify-content-between  list-group-item-action"
                            onClick={()=>{
                                this.props.openBookV2(item.bookId)
                            }}
                        >
                            {item.title}
                            {badge}
                        </ListGroup.Item>
                )
                 
            }
            
            )
        }


		return (
            <div>
                {displayResult}
            </div>
        )
	}

    render(){
        return (
        <ListGroup>
			{this.renderTableData()}
		</ListGroup>
        )
    }

}

const mapStatetoProps = (state) => {   
    return {
        store: {
            readListId: state.listId,
            seriesId: state.seriesItem.seriesId,
            JWT: state.JWT
        }
    };
}

export default connect(
    mapStatetoProps,
    { 
        openBookV2,
        openSignIn
    }
)(SeriesItemShow)