import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'

export default function useBookStatuses({listId}){
    const dispatch = useDispatch();

    const [stateListId] = useState(listId);

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(true);
	const [bookStatuses, setBookStatuses] = useState<any[]>([
        {
            statusId: 1,
            statusName: "In progress"
        },
        {
            statusId: 2,
            statusName: "Completed"
        },
        {
            statusId: 3,
            statusName: "Expecting"
        },
        {
            statusId: 4,
            statusName: "Dropped"
        }
    ]);

    const res= {
        error,
        isLoaded,
        bookStatuses
    }

    return res;
}