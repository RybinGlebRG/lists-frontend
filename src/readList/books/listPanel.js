import React, {useState, useEffect} from 'react';
import {switchListOrdering, openBookAdd} from './booksSlice'
import * as dateUtils from '../../utils/dateUtils'
import * as bookApi from './bookApi'
import {openSignIn} from '../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import ItemRow from '../../common/ItemRow'
import {
    openBookV2
} from '../../redux/actionCreators'
import {
    openBook,
    openBookUpdate
} from './booksSlice'

const statusSVGMap = {
	"In progress": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-primary"} viewBox="0 0 16 16">
							   <circle cx="8" cy="8" r="8"/>
							</svg>
	),
	"Completed": (   
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-secondary" viewBox="0 0 16 16">
		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
	  </svg>                 
	),
	"Expecting": (  
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill text-warning" viewBox="0 0 16 16">
		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
	  </svg>               
	),
	"Dropped": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill text-secondary" viewBox="0 0 16 16">
		<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
		</svg>
	),
	"_fallback": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-white"} viewBox="0 0 16 16">
			<circle cx="8" cy="8" r="8"/>
		</svg>
	)
}

async function loadData(listOrdering, JWT, listId, onUnauthorized){
	let body={
			sort:[{
				field:"createDate",
				ordering: listOrdering
			}],
			isChainBySeries: true
		}
	let bookList = await bookApi.searchBooks(JWT, listId, body, onUnauthorized)	
	return bookList;
}

function getTableData(error, isLoaded, list, dispatch){
	if (error){
		return <div class="alert alert-danger" role="alert">{error}</div>;
	} else if (!isLoaded){
		return(
			<div class="d-flex justify-content-center">
				<div class="spinner-border m-5" role="status">
					<span class="sr-only"/>
				</div>
			</div>
		)
	} else {

		

	return(
		<div class="row">
			<div class="col">
				<ul class="list-group">
					{list.map((item) =>{
						const status = statusSVGMap[item.bookStatus.statusName];
						const data = (
							<div class="col">
								<div class="row">
									<div class="col-auto">
										{status}
									</div>
									<div class="col ps-0">
										<p class="font-weight-bold">{item.title} {item.bookType ? "("+item.bookType.typeName+")" : null}</p>
									</div>
								</div>							
								{item.lastChapter ? (
								<div class="row">
									<div class="col">Last chapter: {item.lastChapter}</div>
								</div>
								): null}
								<div class="row">
									<div class="col">Added: {dateUtils.formatToDisplay(item.insertDate)}</div>
								</div>
								
							</div>
						)

						const buttons = [
							{
								"onClick": ()=>{
									dispatch(openBook({bookId: item.bookId}));
									dispatch(openBookV2(item.bookId));
								},
								"SVG": (
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
										<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
									</svg>
								)
							},
							{
								"onClick": ()=>{
									dispatch(openBookUpdate({bookId: item.bookId}));
								},
								"SVG": (
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
										<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
									</svg> 
								)
							}
						]

						const chain = item.chain.map(item=>{
							const status = statusSVGMap[item.bookStatus.statusName];
							return {
								"data": (
									<div class="col">
										<div class="row">
											<div class="col-auto">
												{status}
											</div>
											<div class="col ps-0">
												<p class="font-weight-bold">{item.title} {item.bookType ? "("+item.bookType.typeName+")" : null}</p>
											</div>
										</div>							
										{item.lastChapter ? (
										<div class="row">
											<div class="col">Last chapter: {item.lastChapter}</div>
										</div>
										): null}
										<div class="row">
											<div class="col">Added: {dateUtils.formatToDisplay(item.insertDate)}</div>
										</div>
										
									</div>
								),
								"buttons": [
									{
										"onClick": ()=>{
											dispatch(openBook({bookId: item.bookId}));
											dispatch(openBookV2(item.bookId));
										},
										"SVG": (
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
												<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
											</svg>
										)
									},
									{
										"onClick": ()=>{
											dispatch(openBookUpdate({bookId: item.bookId}));
										},
										"SVG": (
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
												<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
											</svg> 
										)
									}
								]
							}
						})

						return (
							<li class="list-group-item p-0">
								{/* <Row 
									title={item.title}
									bookType={item.bookType}
									bookStatus={item.bookStatus}
									lastChapter={item.lastChapter}
									createDate={dateUtils.formatToDisplay(item.insertDate)}
									bookId={item.bookId}
									chainBooks={item.chain}
								/> */}
								<ItemRow
									data={data}
									buttons={buttons}
									chainData={chain}
								/>
							</li>
						)
					})}
				</ul>
			</div>
		</div>	
	);
	}
}

function getControls(listOrdering, reload, switchOrdering, openBookAdd){
	let bookOrdering;

	if (listOrdering==="DESC"){
		bookOrdering = (
			<button 
					type="button"
					class="btn btn-secondary btn-sm"
						onClick={switchOrdering}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
						<path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
					</svg>
			</button>
		)
	} else {
		bookOrdering = (
			<button 
					type="button"
					class="btn btn-secondary btn-sm"
						onClick={switchOrdering}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16">
						<path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
					</svg>
			</button>
		)
	}

	let controls=(
		<div class="row">
			<div class="col">
			<div class="row">
				<div class="col pb-2 mt-4 mb-2 border-bottom">			
					<div class="row">
						<div class="col">
							<h3>Book List</h3>
						</div>
						<div class="col-md-auto">
								<button 
									type="button"
									class="btn btn-secondary btn-sm"
										onClick={reload}
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
										onClick={openBookAdd}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
										<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
									</svg>
							  </button>
							</div>
					</div>
					
				</div>	
			</div>
			<div class="row">
				<div class="col pb-2 mt-2 mb-2 border-bottom">
					{bookOrdering}
				</div>
			</div>
			</div>
		</div>
	)

	return controls;
}

export default function ListPanel(){
	const dispatch = useDispatch();
	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [bookList,setBookList] = useState(null);
	const [isReload,setIsReload] = useState(false);
	let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
		listId: useSelector(state=>state.listsReducer.listId),
		listOrdering: useSelector(state=>state.booksReducer.listOrdering)
    }

	useEffect(()=>{
        let promises=[];
        promises.push(loadData(store.listOrdering, store.JWT, store.listId, ()=> dispatch(openSignIn()) ));

        Promise.all(promises)
        .then(([bookList]) =>{
            setBookList(bookList.items);
            setError(null);
            setIsLoaded(true);   
        })
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});
    },[])

	if (isReload) {
		setIsReload(false);
		setBookList({});
		setError(null);
		setIsLoaded(false);
		loadData(store.listOrdering, store.JWT, store.listId, ()=> dispatch(openSignIn()))
		.then(res=>{	
			setError(null);
			setBookList(res.items);	
			setIsLoaded(true);
		})
		.catch(err=>{
			setError(err.message);
			setBookList(null);
			setIsLoaded(true);
		});
	}

	const tableData = getTableData(
		error, 
		isLoaded, 
		bookList,
		dispatch
	)

	const controls = getControls(
		store.listOrdering,
		()=>{
			setIsReload(true);
		},
		()=>{
			dispatch(switchListOrdering());
			setIsReload(true);
		},
		()=>{
			dispatch(openBookAdd());
		}
	);

	return (
		<div class="row">
			<div class="col">
				{controls}
				{tableData}
			</div>
		</div>
	);
}
