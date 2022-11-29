import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    openSignIn, 
    seriesItemSetLoadingState,
    openSeriesList,
    openBookV2,
    openSeriesItem,
    seriesItemAddBook
} from '../redux/actionCreators'
import SeriesItemShow from './itemShow' 
import SeriesItemAdd from './add'

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
            displayResult=(
                <div>
                    <div class="mb-4 mt-4 border-bottom">
                    <Row>
                        <Col>
                    <div class="pb-0 mt-3 mb-2 ">
                            <h2>{this.state.series.title}</h2>
                    </div>
                    </Col>
                    <div class="col-md-auto">
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
                    </Row>
                    </div>
                    {this.props.store.isAdd ? <SeriesItemAdd/> : <SeriesItemShow/>}  
                    
                </div>
            )
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
            readListId: state.listId,
            seriesId: state.seriesItem.seriesId,
            JWT: state.JWT,
            isAdd: state.seriesItem.isAdd
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
        seriesItemAddBook
    }
)(SeriesItem)