import {useState, useEffect} from 'react';
import * as bookApi from './bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function useReadingRecords({bookId}){
    const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [readingRecords, setReadingRecords] = useState(null);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }

    useEffect(()=>{
        bookApi.getReadingRecords({JWT: store.JWT, bookId: bookId, onUnauthorized: ()=> dispatch(openSignIn())})
        .then(readingRecords =>{
            setError(null);
            setReadingRecords(readingRecords);
            setIsLoaded(true);
        })
        .catch(
            error => {
                setError(error.message);
                setReadingRecords(null);
                setIsLoaded(true);
        });
    },[bookId]);

    const res= {
        error,
        isLoaded,
        readingRecords
    }

    return res;
}