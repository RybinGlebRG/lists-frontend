import {useState, useEffect} from 'react';
import * as bookApi from '../books/book/bookApi'
import * as authorsApi from './authorsApi'
import {openSignIn} from '../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useAuthorList({listId}){
    const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [authors, setAuthors] = useState(null);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }

    useEffect(()=>{
        authorsApi.getAuthors(store.JWT, listId, ()=> dispatch(openSignIn()))
        .then(authors =>{
            setError(null);
            setAuthors(authors.items);
            setIsLoaded(true);
        })
        .catch(
            error => {
                setError(error.message);
                setAuthors(null);
                setIsLoaded(true);
        });
    },[listId]);

    const res= [
        error,
        isLoaded,
        authors
    ]

    return res;
}