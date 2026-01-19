import {useState} from 'react';

export default function useBookStatuses({listId}){
	const [error] = useState(null);
	const [isLoaded] = useState(true);
	const [bookStatuses] = useState<any[]>([
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