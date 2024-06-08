import {useState, useEffect} from 'react';
import * as bookApi from '../bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as dateUtils from '../../../utils/dateUtils'

export default function useBook({listId, bookId}){
    const dispatch = useDispatch();
	const [error,setError] = useState(null);
	const [isLoaded,setIsLoaded] = useState(false);
	const [data, setData] = useState(null);
    const [createDate, setCreateDate] = useState(null);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }

    useEffect(()=>{
        bookApi.loadBook(store.JWT, listId, bookId, ()=> dispatch(openSignIn()))
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
    },[listId, bookId]);

    const res= {
        error,
        isLoaded,
        book: data,
        createDate
    }

    return res;
}