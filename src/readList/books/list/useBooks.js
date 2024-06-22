import React, {useState, useEffect} from 'react';
import * as bookApi from '../bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
    openBook,
    openBookUpdate,
    switchListOrdering, 
    openBookAdd
} from '../booksSlice'

async function loadData(listOrdering, bookStatuses, JWT, listId, onUnauthorized, title){
	let body={
			sort:[{
				field:"createDate",
				ordering: listOrdering
			}],
			isChainBySeries: true
		}
	let filters = [];
	if (bookStatuses != null){
		filters.push({
			"field": "bookStatusIds",
			"values": bookStatuses
				.filter(item => item.checked)
				.map(item => item.statusId.toString())
		});
	}
	if (title != null && title.length > 0){
		filters.push({
			"field": "titles",
			"values": [title]
		});
	}
	if (filters.length > 0){
		body={
			...body,
			filters: filters
		}
	}

	let bookList = await bookApi.searchBooks(JWT, listId, body, onUnauthorized)	
	return bookList;
}

export default function useBooks(){
    const dispatch = useDispatch();
	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [bookList,setBookList] = useState(null);
	const [isReload,setIsReload] = useState(false);
	const [titleSearch,setTitleSearch] = useState(null);
	// const [isExpectingSet,setIsExpectingSet] = useState(false);
	const [bookStatuses,setBookStatuses] = useState(null);
	let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
		listId: useSelector(state=>state.listsReducer.listId),
		listOrdering: useSelector(state=>state.booksReducer.listOrdering)
    }

	useEffect(()=>{
        let promises=[];
        promises.push(loadData(store.listOrdering, bookStatuses, store.JWT, store.listId, ()=> dispatch(openSignIn()),titleSearch ));
		promises.push(bookApi.getBookStatuses(store.JWT,()=> dispatch(openSignIn())));

        Promise.all(promises)
        .then(([bookList, bookStatuses]) =>{
            setBookList(bookList.items);
			bookStatuses = bookStatuses.items.map(item=>{
				let res = {
					...item,
					checked: true
				}
				return res;
			})
			setBookStatuses(bookStatuses);
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
		loadData(store.listOrdering, bookStatuses, store.JWT, store.listId, ()=> dispatch(openSignIn()), titleSearch)
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

    const res= {
        error,
        isLoaded,
        bookList,
        bookStatuses,
        listOrdering: store.listOrdering,
        titleSearch,
        openBook: (bookId)=>{
            dispatch(openBook({bookId: bookId}));
        },
        reload: ()=>{
            setIsReload(true);
        },
        switchOrdering:()=>{
            dispatch(switchListOrdering());
            setIsReload(true);
        },
        openBookAdd: ()=>{
            dispatch(openBookAdd());
        },
        openBookUpdate: (bookId)=>{
            dispatch(openBookUpdate({bookId: bookId}));
        },
        updateSearched: (title)=>{
            setTitleSearch(title);
            setIsReload(true);
        }
    }

    return res;
}