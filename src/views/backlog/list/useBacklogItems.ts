import BacklogItem from "../../../domain/backlog/BacklogItem";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'

export default function useBacklogItems(){
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isReload, setIsReload] = useState(false);

    let store={
        JWT: useSelector((state: any) =>state.listsReducer.JWT),
        userId: useSelector((state: any)=>state.listsReducer.userId)
    }

    useEffect(()=>{
        
    }, [])

    let backlogItems: BacklogItem[] = [];


    const res= {
        error,
        isLoaded,
        backlogItems,
        reload: () => {
            setIsReload(true);
        }
    }

    return res;
}
