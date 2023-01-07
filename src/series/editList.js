import React from 'react';
import { connect } from 'react-redux';
import {
    openSignIn,
    openSeriesItemShow
} from '../redux/actionCreators'

class SeriesEdit extends React.Component{
    constructor(props){
		super(props);
		this.state={
			error: null,
            isLoaded: false,
            series: null,
            dragIndex: null,
            dragOverIndex: null,
        };

        this.dragStart = this.dragStart.bind(this);
        this.dragEnter = this.dragEnter.bind(this);
        this.drop = this.drop.bind(this);
        this.dragOver = this.dragOver.bind(this);
    }

    dragStart(e, index){
        this.setState({
            dragIndex:index
        });
    }

    dragEnter(e, index) {
        this.setState({
            dragOverIndex:index
        });
      };

    drop (e)  {
        const copyListItems = [...this.state.series.items];
        const dragItemContent = copyListItems[this.state.dragIndex];
        copyListItems.splice(this.state.dragIndex, 1);
        copyListItems.splice(this.state.dragOverIndex, 0, dragItemContent);
        this.setState({
            dragIndex: null,
            dragOverIndex: null,
            series: {
                ...this.state.series,
                items: copyListItems
            }
        })
    };

    dragOver(e){
        e.preventDefault();
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

    async saveDataAsync(series){
        let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/series/${this.props.store.seriesId}`,
		{
			method: "PUT",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`,
                'Content-Type': 'application/json;charset=utf-8'
			},
            body: JSON.stringify(series)
        });
        let result;
        if (!res.ok){
            result=await res.json();
            throw new Error('Error: '+result.error);
        };

    }

    saveData(){
        let tmp={
            title: this.state.series.title,
            items: this.state.series.items.map((item,index)=>{
                return {
                    "itemType":"BOOK",
                    "itemId": item.bookId,
                    "itemOrder": index
                }
            })
        }
        this.saveDataAsync(tmp)
        .then(result =>{
            this.props.openSeriesItemShow();
        })
        .catch(
            error => {
                this.setState({
                    error: error.error
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
                <span class="sr-only"/>
            </div>
            </div>);
        } else {
            let header = (
                <div>
                    <div class="mb-4 mt-4 border-bottom">
                        <div class="row">
                            <div class="col">
                                <div class="pb-0 mt-3 mb-2 ">
                                    <h2>{this.state.series.title} (Edit)</h2>
                                </div>
                            </div>
                            <div class="col-md-auto">
                                <button 
                                    type="button"
                                    class="btn btn-secondary btn-sm"
                                    onClick={()=>{
                                        this.props.openSeriesItemShow();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>            
                </div>
            )


            
            
            let items = this.state.series.items.map((item,index) =>{
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
                            onDragStart={(e) => this.dragStart(e, index)}
                            onDragEnter={(e) => this.dragEnter(e, index)}
                            onDragEnd={this.drop}
                            onClick={()=>{
                                this.props.openBookV2(item.bookId);
                            }}
                        >
                            {item.title}
                            {badge}
                        </li>
                ) 
            } 
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
                            <div 
                                class="col"
                                onDragOver={(e)=>this.dragOver(e)}
                            >
                                {items}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-auto">
                                <button 
                                    type="button"
                                    class="btn btn-primary btn-sm"
                                    onClick={()=>{
                                        // alert("Not implemented!")
                                        this.saveData();
                                    }}
                                >Submit</button>
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
        <ul 
            class="list-group"
            
        >
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
        openSeriesItemShow,
        openSignIn
    }
)(SeriesEdit)