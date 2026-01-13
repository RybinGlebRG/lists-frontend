import {useState, useEffect} from 'react';
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as dateUtils from '../../../utils/dateUtils'
import PutBookRequest from '../api/PutBookRequest';
import Book from '../../../domain/book/Book';
import * as bookFactory from '../../../domain/book/bookFactory';
import * as BookRepository from '../../../dao/book/BookRepository';

export default function useBook(){
    const dispatch = useDispatch();

	const [error,setError] = useState<any>(null);
	const [isLoaded,setIsLoaded] = useState<boolean>(false);
	const [data, setData] = useState<ResponseBook | null>(null);

    const [updateError, setUpdateError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);

    const [bookId] = useState(useSelector((state: any)=>state.booksReducer.bookId));
    const [userId] = useState(useSelector((state: any)=>state.listsReducer.userId));
	
    let store={
        JWT: useSelector((state: any)=>state.listsReducer.JWT)
    }

    useEffect(()=>{
        BookRepository.loadBook(bookId, ()=> dispatch(openSignIn(null)))
        .then(result =>{
            setError(null);
            setData(result);
            setIsLoaded(true);
        })
        .catch(
            error => {
                setError(error.message);
                setData(null);
                setIsLoaded(true);
        });
    },[bookId]);

    let updateBook = (postBookRequest: PutBookRequest, onUpdate: () => void) => {
        setIsUpdated(false);
        BookRepository.putBook(postBookRequest, ()=> dispatch(openSignIn(null))) 
        .then(result => {
            setUpdateError(null);
            setIsUpdated(true);
            if (onUpdate != null) {
                onUpdate();
            }
        })
        .catch(error => {
            setUpdateError(error.message);
            setIsUpdated(true);
            alert(error.message);
        })
    }

    let book: Book | null = null;
    if (data != null) {
        book = bookFactory.fromResponseBook(data)
    }

    const res= {
        error,
        isLoaded,
        book,
        updateBook
    }

    return res;
}