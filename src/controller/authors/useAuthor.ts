import {useState, useEffect} from 'react';
import * as AuthorsRepository from '../../dao/author/AuthorsRepository'
import { useSelector } from 'react-redux'
import { RootState } from '../../dao/redux/store';

export default function useAuthor(){
    let store={
        authorId: useSelector((state: RootState) => state.authorsReducer.authorId)
    }

    const [authorId] = useState<number | null>(store.authorId);
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [author, setAuthor] = useState<any>(null);

    useEffect(()=>{

        if (authorId == null) {
            throw new Error("authorId cannot be null")
        }

        setIsLoaded(false);
        AuthorsRepository.getAuthor(authorId)
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

        if (authorId == null) {
            throw new Error("authorId cannot be null")
        }

        setIsLoaded(false);
        AuthorsRepository.deleteAuthor(authorId)
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

    const res= {
        error,
        isLoaded,
        author,
        deleteAuthor
    }

    return res;
}
