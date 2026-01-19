import {useState, useEffect} from 'react';
import * as authorsApi from '../../dao/author/AuthorsRepository'

export default function useAuthorList(){
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [authors, setAuthors] = useState<any[] | null>(null);

    useEffect(()=>{
        authorsApi.getAuthors()
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
        authorsApi.addAuthor(body)
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
