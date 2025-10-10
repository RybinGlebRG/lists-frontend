import {useState, useEffect} from 'react';
import * as bookApi from '../api/bookApi';
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useBookStatuses({listId}){
    const dispatch = useDispatch();

    const [stateListId] = useState(listId);

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [bookStatuses, setBookStatuses] = useState<any[] | null>(null);
	
    let store={
        JWT: useSelector((state: any) => state.listsReducer.JWT)
    }

    useEffect(()=>{
        bookApi.getBookStatuses(store.JWT, ()=> dispatch(openSignIn({})))
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
    },[stateListId]);

    const res= {
        error,
        isLoaded,
        bookStatuses
    }

    return res;
}