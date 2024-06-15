import {useState, useEffect} from 'react';
import * as bookApi from '../bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useBookTypes({listId}){
    const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [bookTypes, setBookTypes] = useState(null);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }

    useEffect(()=>{
        bookApi.getBookTypes(store.JWT, ()=> dispatch(openSignIn()))
        .then(bookTypes =>{
            setError(null);
            setBookTypes(bookTypes.items);
            setIsLoaded(true);
        })
        .catch(
            error => {
                setError(error.message);
                setBookTypes(null);
                setIsLoaded(true);
        });
    },[listId]);

    const res= [
        error,
        isLoaded,
        bookTypes
    ]

    return res;
}