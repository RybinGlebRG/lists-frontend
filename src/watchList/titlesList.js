import React, {useState, useEffect} from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import {openAddTitle, openTitle} from '../redux/actionCreators';
import ItemRow from '../common/ItemRow'
import * as dateUtils from '../utils/dateUtils'
import { useSelector, useDispatch } from 'react-redux'
import * as watchListApi from './watchListApi'
import {openSignIn} from '../displayAreaSlice'


const statusSVGMap = {
	"1": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-primary"} viewBox="0 0 16 16">
							   <circle cx="8" cy="8" r="8"/>
							</svg>
	),
	"2": (   
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-secondary" viewBox="0 0 16 16">
		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
	  </svg>                 
	),
	"_fallback": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-white"} viewBox="0 0 16 16">
			<circle cx="8" cy="8" r="8"/>
		</svg>
	)
}

export default function TitlesList(){
	const dispatch = useDispatch();
	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [data,setData] = useState(null);
	let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
		watchListId: useSelector(state=>state.listsReducer.watchListId),
		listOrdering: useSelector(state=>state.booksReducer.listOrdering)
    }

	useEffect(()=>{
        let promises=[];
        promises.push(watchListApi.loadList(store.JWT, store.watchListId, ()=> dispatch(openSignIn()) ));

        Promise.all(promises)
        .then(([list]) =>{
            setData(list);
            setError(null);
            setIsLoaded(true);   
        })
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});
    },[store.JWT, store.watchListId, dispatch])

	let displayPanel;

	if (error){
		displayPanel=( 
			<div class="alert alert-danger" role="alert">{error}</div>
		);
	} else if (!isLoaded) {
		displayPanel=( 
			<div class="d-flex justify-content-center">
				<div class="spinner-border m-5" role="status">
					<span class="sr-only"></span>
				</div>
			</div>
		);
	} else {
		const titlesListData = data.titles.map((item) =>{
			const status = statusSVGMap[item.statusId.toString()];
			const data = (
				<div class="row">
					<div class="col">	
						<div class="row">
							<div class="col-auto">
								{status}
							</div>
							<div class="col ps-0">
								<p class="font-weight-bold">{item.name}</p>
							</div>
						</div>
						<div class="row">
							<div class="col">Status: {item.statusId === 2 ? "Completed" : "In progress"}</div>
						</div>
						<div class="row">
							<div class="col">Type: {item.videoType.name}</div>
						</div>
						<div class="row">
							<div class="col">Added: {dateUtils.formatToDisplay(item.create_date_utc)}</div>
						</div>
					</div>
				</div>
			)
			const buttons = [
				{
					"onClick": ()=>{
							dispatch(openTitle(item.id));
					},
					"SVG": (
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
							<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
						</svg>
					)
				}
			]

			return (
					<li 
						class="list-group-item p-0"
					>
						<ItemRow
							data={data}
							buttons={buttons}
						/>
					</li>
			);
			
		})
		displayPanel=(	
			<ListGroup>
				{titlesListData}
			</ListGroup>
		);
	}

	return (
		<Row>
			<Col>		
				<Row>
					<Col  bsPrefix="col pb-2 mt-4 mb-2 border-bottom">
						<Row>
							<Col>
								<h3>Titles</h3>
							</Col>
							<div class="col-md-auto">
								<button 
									type="button"
									class="btn btn-secondary btn-sm"
										onClick={()=>{
											this.loadTitlesList();
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
											dispatch(openAddTitle());
										}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
										<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
									</svg>
								</button>
							</div>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col>
						{displayPanel}
					</Col>
				</Row>
			</Col>
		</Row>
        
	)
}
