import * as tagsApi from '../../dao/tag/TagsRepository'
import {useState, useEffect} from 'react';
import Tag from '../../domain/tag/Tag';

export default function useTags() {
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [data, setData] = useState<Tag[] | null>(null);
    const [isReaload, setIsReload] = useState(true);

    useEffect(()=>{
        if (isReaload) {
            tagsApi.getTags()
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

    let addTag = ({name, onUpdate}) => {
        setIsLoaded(false);
        tagsApi.addTag(name)
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
        tagsApi.deleteTag(tagId)
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