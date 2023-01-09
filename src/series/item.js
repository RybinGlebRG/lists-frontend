import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    openSignIn, 
    seriesItemSetLoadingState,
    openSeriesList,
    openBookV2,
    openSeriesItem,
    // seriesItemAddBook
} from '../redux/actionCreators'
import SeriesItemShow from './itemShow' 
import SeriesItemAdd from './add'
import SeriesEdit from './editList'
import * as seriesForms from './forms.js'
import {
	selectSeries
} from './seriesSlice'

class SeriesItem extends React.Component{
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

    // async performDeleteSeries(){
    //     let res = await fetch(
    //         window.env.BACKEND_ADDR_V2+"/api/v0.2/bookSeries/"+this.props.store.seriesId,
    //         {
    //             method: "DELETE",
    //             headers: {
    //                 'Authorization': 'Bearer '+this.props.store.JWT
    //             }
    //         }
    //     );
    //     if (!res.ok){
    //         let result=await res.json();
    //         throw new Error('Error: '+result.errorMessage);
    //     };
    // }

    // deleteSeries(){
    //     this.performDeleteSeries()
    //     .then(
    //         res=>{
    //             this.props.openSeriesList();
    //         }
    //     )
    //     .catch(
    //         error => {
    //             alert(error.message);
    //     });
    // }

    render(){
        let displayResult;
        if (this.state.error){
            displayResult=( <div class="alert alert-danger" role="alert">{this.state.error}</div>);
        } else if (!this.state.isLoaded){
            displayResult=( 
            <div class="d-flex justify-content-center">
            <div class="spinner-border m-5" role="status">
                <span class="sr-only"></span>
            </div>
            </div>);
        } else {
            // let displayResult;
            if (this.props.store.seriesForm===seriesForms.ADD_ITEM){
                displayResult=(<SeriesItemAdd/>)
            } else if (this.props.store.seriesForm===seriesForms.SHOW_ITEMS) {
                displayResult=(<SeriesItemShow/>)
            } else if (this.props.store.seriesForm===seriesForms.EDIT_SERIES){
                displayResult=(<SeriesEdit/>)
            }
        }
        return (
            <div class="row justify-content-center">
                <div class="col col-md-10 pr-5">
                    {displayResult}
                </div>
            </div>
        )
    };
}

// export default SeriesItem;

const mapStatetoProps = (state) => {   
    return {
        store: {
            readListId: state.listsReducer.listId,
            seriesId: state.listsReducer.seriesItem.seriesId,
            JWT: state.listsReducer.JWT,
            isAdd: state.listsReducer.seriesItem.isAdd,
            seriesForm: state.seriesReducer.form
        }
    };
}

export default connect(
    mapStatetoProps,
    { 
        openSignIn, 
        seriesItemSetLoadingState,
        openSeriesList,
        openBookV2,
        openSeriesItem,
        // seriesItemAddBook
    }
)(SeriesItem)