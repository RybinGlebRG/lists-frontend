import * as tagsApi from './tagsApi'
import {openSignIn} from '../../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import Tag from '../../domain/tag/Tag';

export default function useTags() {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [data, setData] = useState<Tag[] | null>(null);
    const [isReaload, setIsReload] = useState(true);

    let store={
        JWT: useSelector((state: any) => state.listsReducer.JWT),
        userId: useSelector((state: any) => state.listsReducer.userId),
        tags: useSelector((state: any) => state.tagsReducer.tags)
    }

    useEffect(()=>{
        if (isReaload) {
            tagsApi.getTags(store.JWT, store.userId, ()=> dispatch(openSignIn({})))
            .then(result =>{
                setError(null);
                setData(result.items.map(item => new Tag(item.tagId, item.name)));
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
        tagsApi.addTag(store.JWT, store.userId, body, ()=> dispatch(openSignIn({})))
        .then(() =>{
            setError(null);
            setIsReload(true);
            onUpdate();
        })
        .catch(error => {
            setError(error.message);
        });
    }

    let deleteTag = ({tagId, onExecute}) => {
        setIsLoaded(false);
        tagsApi.deleteTag(store.JWT, store.userId, tagId, ()=> dispatch(openSignIn({})))
        .then(() =>{
            setError(null);
            setIsReload(true);
            if (onExecute != null) {
                onExecute();
            }
        })
        .catch(error => {
            setError(error.message);
        });
    }

    const res= {
        error,
        isLoaded,
        data,
        addTag,
        deleteTag
    }

    return res;
}