import React, {useState, useEffect} from 'react';
import * as bookApi from '../api/bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
    openBook,
    openBookUpdate,
    switchListOrdering, 
    openBookAdd
} from '../booksSlice'
import Filter from '../api/Filter';
import SortField from '../api/SortField';
import SearchBooksRequest from '../api/SearchBooksRequest'
import Book from '../../../domain/book/Book';
import BookType from '../../../domain/bookType/BookType';
import * as bookFactory from '../../../domain/book/bookFactory';

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



async function loadData(listOrdering: string, bookStatuses: any[], JWT: string, userId: number, onUnauthorized: () => void, title: string){

	// Add filters
	let filters: Filter[] = [];
	if (bookStatuses != null){
		filters.push(new Filter(
			"bookStatusIds",
			bookStatuses
				.filter(item => item.checked)
				.map(item => item.statusId.toString())
		));
	}
	if (title != null && title.length > 0){
		filters.push(new Filter(
			"titles",
			[title]
		));
	}
	
	// Add sorting
	const sortFields: SortField[] = [];
	sortFields.push(new SortField("lastUpdateDate", listOrdering));


	const searchBooksRequest = new SearchBooksRequest(
		userId,
		sortFields,
		true,
		filters,
		JWT
	);
	let bookList = await bookApi.searchBooks(searchBooksRequest, onUnauthorized)	
	return bookList;
}

export default function useBooks(){
    const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [bookList, setBookList] = useState<ResponseBook[] | null>(null);
	const [isReload, setIsReload] = useState(false);
	const [titleSearch, setTitleSearch] = useState<any>(null);
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

	let books: Book[] = [];
	if (bookList != null) {
		books = bookList.map((item: ResponseBook) => bookFactory.fromResponseBook(item));
	}

    const res= {
        error,
        isLoaded,
        bookList,
        bookStatuses,
        listOrdering: store.listOrdering,
        titleSearch,
		books,
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