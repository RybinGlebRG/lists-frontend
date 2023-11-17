import React from 'react';
import { connect,useDispatch } from 'react-redux';
import {
    openSignIn,
    // openSeriesItemShow
} from '../redux/actionCreators'
import {
	openSeriesItem,
    openChooseBooks
} from './seriesSlice'
import * as common from './common'

class SeriesEdit extends React.Component{
    constructor(props){
		super(props);
		this.state={
			error: null,
            isLoaded: false,
            series: null,
            dragIndex: null,
            dragOverIndex: null
        };
        // this.dispatch = useDispatch()

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
        let res = await fetch(window.location.origin+`/api/v0.2/readLists/${this.props.store.readListId}/series/${this.props.store.seriesId}`,
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
        let res = await fetch(window.location.origin+`/api/v0.2/series/${this.props.store.seriesId}`,
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
        .then(() =>{
            this.props.openSeriesItem();
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
            
            let items = this.state.series.items.map((item,index) =>{
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
                        </li>
                ) 
            } 
            )

            displayResult=(
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <common.Header
                                    title={this.state.series.title + " (Edit)"}
                                    buttons={[
                                        (
                                            <button 
                                                type="button"
                                                class="btn btn-success btn-sm"
                                                onClick={()=>{
                                                    // alert("Not implemented!")
                                                    this.saveData();
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                                </svg>
                                            </button>
                                        ),
                                        (
                                            <button 
                                                type="button"
                                                class="btn btn-secondary btn-sm"
                                                onClick={()=>{
                                                    this.props.openSeriesItem();
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                                </svg>
                                            </button>
                                        )
                                    ]}
                                />
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
            readListId: state.listsReducer.listId,
            seriesId: state.listsReducer.seriesItem.seriesId,
            JWT: state.listsReducer.JWT,
            isAdd: state.listsReducer.seriesItem.isAdd
        }
    };
}

export default connect(
    mapStatetoProps,
    { 
        // openSeriesItemShow,
        openSignIn,
        openSeriesItem,
        openChooseBooks
    }
)(SeriesEdit)