import * as tagsApi from './tagsApi'
import {openSignIn} from '../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';

export default function useTags() {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [isReaload, setIsReload] = useState(true);

    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        userId: useSelector(state=>state.listsReducer.userId),
        tags: useSelector(state => state.tagsReducer.tags)
    }

    useEffect(()=>{
        if (isReaload) {
            tagsApi.getTags(store.JWT, store.userId, ()=> dispatch(openSignIn()))
            .then(result =>{
                setError(null);
                setData(result);
                setIsLoaded(true);
                setIsReload(false);
            })
            .catch(error => {
                setError(error.message);
                setData(null);
                setIsLoaded(true);
                setIsReload(false);
            });
        }
    }, [isReaload]);

    let addTag = ({body, onUpdate}) => {
        setIsLoaded(false);
        tagsApi.addTag(store.JWT, store.userId, body, ()=> dispatch(openSignIn()))
        .then(() =>{
            setError(null);
            setIsReload(true);
            onUpdate();
        })
        .catch(error => {
            setError(error.message);
        });
    }

    const res= {
        error,
        isLoaded,
        data: data,
        addTag
    }

    return res;
}