import React, {useState, useEffect} from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import {openAddTitle, openTitle} from '../../../redux/actionCreators';
import ItemRow from '../../../common/ItemRow'
import * as dateUtils from '../../../utils/dateUtils'
import { useSelector, useDispatch } from 'react-redux'
import * as watchListApi from '../../../watchList/watchListApi'
import {openSignIn} from '../../../displayAreaSlice'
import MovieRow from './MovieRow';
import Movie from '../../../domain/movie/Movie';
import { RootState } from '../../../redux/store';


export default function TitlesList(): JSX.Element {
	const dispatch = useDispatch();
	const [error,setError] = useState<any>(null);
	const [isLoaded,setIsLoaded] = useState<boolean>(false);
	const [data,setData] = useState<any>(null);
	let store={
        JWT: useSelector((state: RootState) => state.listsReducer.JWT),
		watchListId: useSelector((state: RootState) => state.listsReducer.watchListId),
		listOrdering: useSelector((state: RootState) => state.booksReducer.listOrdering)
    }

	useEffect(()=>{
        let promises: Promise<any>[]=[];
        promises.push(watchListApi.loadList(store.JWT, store.watchListId, ()=> dispatch(openSignIn({})) ));

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

	let displayPanel: JSX.Element;

	if (error){
		displayPanel = ( 
			<div 
				className="alert alert-danger" 
				role="alert"
			>{error}</div>
		);
	} else if (!isLoaded || data == null) {
		displayPanel=( 
			<div className="d-flex justify-content-center">
				<div className="spinner-border m-5" role="status">
					<span className="sr-only"></span>
				</div>
			</div>
		);
	} else {
		const titlesListData = data.titles.map((item) =>{
			let movie = new Movie(
				item.id,
				item.name,
				item.create_date_utc,
				store.watchListId,
				item.statusId,
				item.videoType,
				item.itemType
			);			

			return (
					<li 
						className="list-group-item p-0"
						aria-label={movie.name}
					>
						<MovieRow
							movie={movie}
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
		<div className="row">
			<div className="col">		
				<div className="row">
					<div className="col pb-2 mt-4 mb-2 border-bottom">
						<div className="row">
							<div className="col">
								<h3>Titles</h3>
							</div>
							<div className="col-md-auto">
								<button 
									type="button"
									className="btn btn-secondary btn-sm"	
									onClick={()=>{
										alert("Not Implemented")
										// this.loadTitlesList();
									}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
										<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
									</svg>
							</button>
							</div>
							<div className="col-md-auto">
								<button 
									type="button"
									className="btn btn-success btn-sm"
										onClick={()=>{
											dispatch(openAddTitle());
										}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
										<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						{displayPanel}
					</div>
				</div>
			</div>
		</div>
        
	)
}
