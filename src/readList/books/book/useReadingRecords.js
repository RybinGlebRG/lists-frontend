import {useState, useEffect} from 'react';
import * as bookApi from './api/bookApi'
import {openSignIn} from '../../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as readingRecordsApi from  '../readingRecordsApi.js';

async function submitRecords({updatedReadingRecords, originalReadingRecords, JWT, bookId, onUnauthorized}){
        let res;
        for (let i = 0; i < updatedReadingRecords.length; i++){
            let item = updatedReadingRecords[i];
            let body = {
                statusId: item.bookStatus != null && item.bookStatus.statusId != null ? item.bookStatus.statusId : 1,
                startDate: item.startDate,
                endDate: item.endDate,
                lastChapter: item.lastChapter
            }

            if (item.recordId != null){
                res = await readingRecordsApi.put({JWT: JWT, bookId: bookId, readingRecordId: item.recordId, body: body, onUnauthorized});
            } else {
                res = await readingRecordsApi.post({JWT: JWT, bookId: bookId, body: body, onUnauthorized});
            }
        }

        let updatedRecordIds = updatedReadingRecords
            .map(item => item.recordId)
            .filter(item => item != null);
        let recordsToDelete = originalReadingRecords.items.filter(item => !updatedRecordIds.includes(item.recordId));

        for (let i = 0; i < recordsToDelete.length; i++){
            let item = recordsToDelete[i];
            res = await readingRecordsApi.deleteOne({JWT: JWT, bookId: bookId, readingRecordId: item.recordId, onUnauthorized});
        }
    }

export default function useReadingRecords(){
    const dispatch = useDispatch();

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [readingRecords, setReadingRecords] = useState(null);

    const [updateError, setUpdateError] = useState(null);
	const [isUpdated, setIsUpdated] = useState(false);
	
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        bookId: useSelector(state=>state.booksReducer.bookId)
    }

    useEffect(()=>{
        bookApi.getReadingRecords({JWT: store.JWT, bookId: store.bookId, onUnauthorized: ()=> dispatch(openSignIn())})
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
    },[store.bookId]);

    let submitReadingRecords = ({readingRecordsToUpdate}) => {
        submitRecords({updatedReadingRecords: readingRecordsToUpdate, originalReadingRecords: readingRecords, JWT: store.JWT, bookId: store.bookId, onUnauthorized: ()=> dispatch(openSignIn())})
            .then(() => {
                setUpdateError(null);
                setIsUpdated(true);
            })
            .catch(error => {
                setUpdateError(error.message);
                setIsUpdated(true);
            });
    }

    const res= {
        error,
        isLoaded,
        readingRecords,
        submitReadingRecords
    }

    return res;
}