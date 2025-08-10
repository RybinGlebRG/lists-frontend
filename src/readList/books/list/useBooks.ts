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

interface SearchBody {
	sort: [
		{
			field: string,
			ordering: string
		}
	],
	isChainBySeries: boolean,
	filters: any[] | null
}

async function loadData(listOrdering: string, bookStatuses: any[], JWT: string, userId: number, onUnauthorized, title: string){
	let body: SearchBody ={
			sort:[{
				field:"createDate",
				ordering: listOrdering
			}],
			isChainBySeries: true,
			filters: null
		}
	let filters: any[] = [];
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

	let bookList = await bookApi.searchBooks(JWT, userId, body, onUnauthorized)	
	return bookList;
}

export default function useBooks(){
    const dispatch = useDispatch();
	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [bookList,setBookList] = useState(null);
	const [isReload,setIsReload] = useState(false);
	const [titleSearch,setTitleSearch] = useState<any>(null);
	// const [isExpectingSet,setIsExpectingSet] = useState(false);
	const [bookStatuses, setBookStatuses] = useState<any>(null);
	let store={
        JWT: useSelector((state: any) =>state.listsReducer.JWT),
		listId: useSelector((state: any)=>state.listsReducer.listId),
		listOrdering: useSelector((state: any)=>state.booksReducer.listOrdering),
		userId: useSelector((state: any)=>state.listsReducer.userId)
    }

	useEffect(()=>{
        let promises: any[]=[];
        promises.push(loadData(store.listOrdering, bookStatuses, store.JWT, store.listId, ()=> dispatch(openSignIn(null)),titleSearch ));
		promises.push(bookApi.getBookStatuses(store.JWT,()=> dispatch(openSignIn(null))));

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
		setBookList(null);
		setError(null);
		setIsLoaded(false);
		loadData(store.listOrdering, bookStatuses, store.JWT, store.listId, ()=> dispatch(openSignIn(null)), titleSearch)
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