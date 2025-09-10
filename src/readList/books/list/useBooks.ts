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
import Book, { BookStatus } from '../../../domain/book/Book';
import BookType from '../../../domain/bookType/BookType';

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

interface ResponseBook {
	bookId: number,
	title: string,
	bookStatus: {
		statusId: number,
		statusName: string
	},
	insertDate: string,
	lastUpdateDate: string,
	lastChapter: number | null,
	note: string | null,
	bookType: {
		typeId: number,
		typeName: string
	},
	itemType: string,
	chain: any[],
	readingRecords: [
		{
			recordId: number,
			bookId: number,
			bookStatus: {
				statusId: number,
				statusName: string
			},
			startDate: string,
			endDate: string | null,
			isMigrated: boolean,
			lastChapter: number | null
		}
	],
	tags: any[],
	textAuthors: any[],
	seriesList: any[],
	url: string
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
		books = bookList.map((item: ResponseBook) => {
			return new Book(
				item.bookId,
				item.title,
				new BookStatus(
					item.bookStatus.statusId,
					item.bookStatus.statusName
				),
				new Date(item.insertDate),
				new Date(item.lastUpdateDate),
				item.lastChapter,
				item.note,
				item.bookType != null ? new BookType(
						item.bookType.typeId,
						item.bookType.typeName
					) : null,
				item.itemType,
				item.chain,
				item.readingRecords,
				item.tags,
				item.textAuthors,
				item.seriesList,
				item.url,
			);
		});
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