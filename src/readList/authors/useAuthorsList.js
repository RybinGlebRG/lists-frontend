import {useState, useEffect} from 'react';
import * as authorsApi from './authorsApi'
import {openSignIn} from '../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useAuthorList(){
    const dispatch = useDispatch();

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [authors, setAuthors] = useState(null);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        userId: useSelector(state=>state.listsReducer.userId)
    }

    useEffect(()=>{
        authorsApi.getAuthors(store.JWT, store.userId, ()=> dispatch(openSignIn()))
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
    },[]);

    const res= [
        error,
        isLoaded,
        authors
    ]

    return res;
}