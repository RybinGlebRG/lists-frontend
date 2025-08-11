import {useState, useEffect} from 'react';
import * as bookApi from '../api/bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as dateUtils from '../../../utils/dateUtils'
import GetBookRequest from '../api/GetBookRequest';

export default function useBook(){
    const dispatch = useDispatch();

	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [data, setData] = useState(null);
    const [createDate, setCreateDate] = useState(null);

    const [updateError, setUpdateError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
	
    let store={
        JWT: useSelector((state: any)=>state.listsReducer.JWT),
        bookId: useSelector((state: any)=>state.booksReducer.bookId),
        listId: useSelector((state: any)=>state.listsReducer.listId),
        userId: useSelector((state: any)=>state.listsReducer.userId)
    }

    useEffect(()=>{
        bookApi.loadBook(new GetBookRequest(store.userId, store.bookId, store.JWT), ()=> dispatch(openSignIn(null)))
        .then(result =>{
            setError(null);
            setData(result);
            setCreateDate(dateUtils.formatToDisplay(result.insertDate))
            setIsLoaded(true);
        })
        .catch(
            error => {
                setError(error.message);
                setData(null);
                setCreateDate(null);
                setIsLoaded(true);
        });
    },[store.listId, store.bookId]);

    let updateBook = ({body, onUpdate}) => {
        setIsUpdated(false);
        bookApi.postBook({JWT: store.JWT, bookId: store.bookId, body: body, onUnauthorized: ()=> dispatch(openSignIn(null))}) 
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

    const res= {
        error,
        isLoaded,
        book: data,
        createDate,
        updateBook
    }

    return res;
}