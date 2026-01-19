import {useState, useEffect} from 'react';
import * as BookRepository from '../../dao/book/BookRepository';


export default function useBookTypes({listId}){

    const [stateListId] = useState(listId);

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [bookTypes, setBookTypes] = useState<any[] | null>(null);

    useEffect(()=>{
        BookRepository.getBookTypes()
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
    },[stateListId]);

    const res= {
        error,
        isLoaded,
        bookTypes
    }

    return res;
}