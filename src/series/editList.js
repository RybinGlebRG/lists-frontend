import React from 'react';
import { connect } from 'react-redux';
import {
    openBookV2,
    openSignIn
} from '../redux/actionCreators'

class SeriesEdit extends React.Component{
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
            displayResult=this.state.series.items.map(item =>{
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
                            draggable="true"
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
        }


		return (
            <div>
                {displayResult}
            </div>
        )
	}

    render(){
        return (
        <ul class="list-group">
			{this.renderTableData()}
		</ul>
        )
    }


}

const mapStatetoProps = (state) => {   
    return {
        store: {
            readListId: state.listId,
            seriesId: state.seriesItem.seriesId,
            JWT: state.JWT,
            isAdd: state.seriesItem.isAdd,
            seriesForm: state.series.form
        }
    };
}

export default connect(
    mapStatetoProps,
    { 
        openBookV2,
        openSignIn
    }
)(SeriesEdit)