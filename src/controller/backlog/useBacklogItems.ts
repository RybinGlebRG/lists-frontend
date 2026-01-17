import BacklogItem from "../../domain/backlog/BacklogItem";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as BacklogRepository from '../../dao/backlog/BacklogRepository'
import { BacklogItemCreateRequest } from "../../dao/backlog/BacklogRepository";
import * as dateUtils from '../../crosscut/utils/dateUtils'
import { setReloaded, reload, setInitialized, setBacklogItems } from '../../dao/backlog/backlogSlice'

export default function useBacklogItems(){
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const [updateError, setUpdateError] = useState<string | null>(null);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const [moveError, setMoveError] = useState<string | null>(null);
    const [isMoved, setIsMoved] = useState<boolean>(false);

    const store={
        JWT: useState<string>(useSelector((state: any) =>state.listsReducer.JWT))[0],
        userId: useState<number>(useSelector((state: any)=>state.listsReducer.userId))[0],
        isReload: useSelector((state: any) => state.backlogReducer.isReload),
        isInitialized: useSelector((state: any) => state.backlogReducer.isInitialized),
        backlogItems: useSelector((state: any) => state.backlogReducer.backlogItems)
    }

    useEffect(()=>{
        if (!store.isInitialized) {
            BacklogRepository.getAll()
            .then(result =>{
                setError(null);
                let backlogItems: BacklogItem[] = result.items.map(item => new BacklogItem(item.id, item.title, item.type, item.note, dateUtils.fromString(item.creationDate)));
                dispatch(setBacklogItems({backlogItems: backlogItems}));
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                dispatch(setInitialized())
                setIsLoaded(true);
            })
        } else {
            setIsLoaded(true);
        }
        
    },[])

    let createBacklogItem = (backlogItemCreateReqauest: BacklogItemCreateRequest, onUpdate: () => void) => {
        BacklogRepository.create(backlogItemCreateReqauest)
        .then(result => {
            setUpdateError(null);
            setIsUpdated(true);
            dispatch(reload());
            if (onUpdate != null) {
                onUpdate();
            }
        })
        .catch(error => {
            setUpdateError(error.message);
            setIsUpdated(true);
            alert(error.message);
        })
    }

    let deleteBacklogItem = (backlogItemId: number) => {
        BacklogRepository.deleteBacklogItem(backlogItemId)
        .then(result => {
            setDeleteError(null);
            setIsDeleted(true);
            dispatch(reload());
        })
        .catch(error => {
            setDeleteError(error.message);
            setIsDeleted(true);
            alert(error.message);
        })
    }

    let createBookMoveEvent = (backlogItem: BacklogItem) => {
        BacklogRepository.createBacklogItemEvent(
            {
                eventTypeId: 0
            },
            backlogItem.id
        )
        .then(result => {
            setMoveError(null);
            setIsMoved(true);
            dispatch(reload());
        })
        .catch(error => {
            setMoveError(error.message);
            setIsMoved(true);
            alert(error.message);
        })
    }

    if (store.isReload) {
        dispatch(setReloaded())
        BacklogRepository.getAll()
        .then(result =>{
            setError(null);
            dispatch(setBacklogItems({backlogItems: result.items.map(item => new BacklogItem(item.id, item.title, item.type, item.note, dateUtils.fromString(item.creationDate)))}))
            setIsLoaded(true);
        })
        .catch(error => {
            setError(error.message);
            setIsLoaded(true);
        });
    }
    const res= {
        error,
        isLoaded,
        backlogItems: store.backlogItems,
        reload: () => {
            dispatch(reload());
        },

        createBacklogItem,
        updateError,
        isUpdated,

        deleteBacklogItem,
        deleteError,
        isDeleted,

        createBookMoveEvent,
        moveError,
        isMoved
    }

    return res;
}
