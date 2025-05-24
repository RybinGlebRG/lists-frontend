import {useState, useEffect} from 'react';
import * as authorsApi from './authorsApi'
import {openSignIn} from '../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useAuthor(){
    const dispatch = useDispatch();

    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        userId: useSelector(state=>state.listsReducer.userId),
        authorId: useSelector(state=>state.authorsReducer.authorId)
    }

    const [authorId] = useState(store.authorId);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [author, setAuthor] = useState(null);

    useEffect(()=>{
        setIsLoaded(false);
        authorsApi.getAuthor(store.JWT, authorId, ()=> dispatch(openSignIn()))
        .then(author =>{
            setError(null);
            setAuthor(author);
            setIsLoaded(true);
        })
        .catch(
            error => {
                setError(error.message);
                setAuthor(null);
                setIsLoaded(true);
        });
    },[]);

    let deleteAuthor = ({onExecute}) => {
        setIsLoaded(false);
        authorsApi.deleteAuthor(store.JWT, authorId, ()=> dispatch(openSignIn()))
        .then(() => {
            setError(null);
            setIsLoaded(true);
             if (onExecute) {
                onExecute();
            }
        })
        .catch(error => {
            setError(error.message);
            setIsLoaded(true);
        });
    }

    const res= [
        error,
        isLoaded,
        author,
        deleteAuthor
    ]

    return res;
}
