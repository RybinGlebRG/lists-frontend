import {useState, useEffect} from 'react';
import * as bookApi from '../bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as dateUtils from '../../../utils/dateUtils'

export default function useBook({listId, bookId, onUpdate}){
    const dispatch = useDispatch();

    const [stateListId] = useState(listId);
    const [statebookId] = useState(bookId);
    const [stateOnUpdate] = useState(onUpdate);

	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [data, setData] = useState(null);
    const [createDate, setCreateDate] = useState(null);

    const [bookToUpdate, setBookToUpdate] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }

    useEffect(()=>{
        bookApi.loadBook(store.JWT, stateListId, statebookId, ()=> dispatch(openSignIn()))
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
    },[stateListId, statebookId]);

    useEffect(() => {
        if (bookToUpdate != null) {
            setIsUpdated(false);
            bookApi.postBook({JWT: store.JWT, bookId: statebookId, body: bookToUpdate, onUnauthorized: ()=> dispatch(openSignIn())}) 
            .then(result => {
                setUpdateError(null);
                setIsUpdated(true);
                if (stateOnUpdate != null) {
                    stateOnUpdate();
                }
            })
            .catch(error => {
                setUpdateError(error.message);
                setIsUpdated(true);
                alert(error.message);
            })
        }
    }, [bookToUpdate]);

    const res= {
        error,
        isLoaded,
        book: data,
        createDate,
        setBookToUpdate
    }

    return res;
}