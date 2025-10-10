import {useState, useEffect} from 'react';
import * as authorsApi from './authorsApi'
import {openSignIn} from '../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useAuthorList(){
    const dispatch = useDispatch();

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [authors, setAuthors] = useState<any[] | null>(null);
	
    let store={
        JWT: useSelector((state: any) => state.listsReducer.JWT),
        userId: useSelector((state: any) => state.listsReducer.userId)
    }

    useEffect(()=>{
        authorsApi.getAuthors(store.JWT, store.userId, ()=> dispatch(openSignIn({})))
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

    let addAuthor = ({body, onExecute}) => {
        authorsApi.addAuthor(store.JWT, store.userId, body, ()=> dispatch(openSignIn({})))
        .then(authors =>{
            setError(null);
            setIsLoaded(true);
            if (onExecute) {
                onExecute();
            }
        })
        .catch(
            error => {
                setError(error.message);
                setIsLoaded(true);
        });
    }

    const res= {
        error,
        isLoaded,
        authors,
        addAuthor
    }

    return res;
}
