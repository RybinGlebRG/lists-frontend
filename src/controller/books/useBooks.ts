import {useState, useEffect} from 'react';
import {openSignIn} from '../../dao/displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
    openBook,
    openBookUpdate,
    switchListOrdering, 
    openBookAdd
} from '../../dao/book/booksSlice'
import Filter from '../../dao/book/Filter';
import SortField from '../../dao/book/SortField';
import SearchBooksRequest from '../../dao/book/SearchBooksRequest'
import Book from '../../domain/book/Book';
import * as bookFactory from '../../domain/book/bookFactory';
import User from '../../domain/user/User';
import {selectUser} from '../../dao/user/loginSlice'
import * as BookRepository from '../../dao/book/BookRepository';


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



async function loadData(listOrdering: string, bookStatuses: any[], user: User, title: string){

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
	sortFields.push(new SortField("readingRecords.updateDate", listOrdering));


	const searchBooksRequest = new SearchBooksRequest(
		sortFields,
		true,
		filters
	);
	let bookList = await BookRepository.searchBooks(searchBooksRequest)	
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
		listId: useSelector((state: any)=>state.listsReducer.listId),
		listOrdering: useSelector((state: any)=>state.booksReducer.listOrdering)
    }
	const user = useSelector(selectUser);
	

	useEffect(()=>{
        let promises: any[]=[];
        promises.push(loadData(store.listOrdering, bookStatuses, user, titleSearch ));
		promises.push(BookRepository.getBookStatuses(user.accessToken,()=> dispatch(openSignIn(null))));

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
		loadData(store.listOrdering, bookStatuses, user, titleSearch)
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