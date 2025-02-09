import {useState, useEffect} from 'react';
import * as bookApi from '../bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as dateUtils from '../../../utils/dateUtils'

export default function useBook(){
    const dispatch = useDispatch();

	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [data, setData] = useState(null);
    const [createDate, setCreateDate] = useState(null);

    const [updateError, setUpdateError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        bookId: useSelector(state=>state.booksReducer.bookId),
        listId: useSelector(state=>state.listsReducer.listId)
    }

    useEffect(()=>{
        bookApi.loadBook(store.JWT, store.listId, store.bookId, ()=> dispatch(openSignIn()))
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
        bookApi.postBook({JWT: store.JWT, bookId: store.bookId, body: body, onUnauthorized: ()=> dispatch(openSignIn())}) 
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