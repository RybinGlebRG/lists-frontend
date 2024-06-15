import {useState, useEffect} from 'react';
import * as bookApi from '../bookApi';
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useBookStatuses({listId}){
    const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [bookStatuses, setBookStatuses] = useState(null);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }

    useEffect(()=>{
        bookApi.getBookStatuses(store.JWT, ()=> dispatch(openSignIn()))
        .then(bookStatuses =>{
            setError(null);
            setBookStatuses(bookStatuses.items);
            setIsLoaded(true);
        })
        .catch(
            error => {
                setError(error.message);
                setBookStatuses(null);
                setIsLoaded(true);
        });
    },[listId]);

    const res= [
        error,
        isLoaded,
        bookStatuses
    ]

    return res;
}