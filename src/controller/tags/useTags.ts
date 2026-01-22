import * as TagsRepository from '../../dao/tag/TagsRepository'
import {useState, useEffect} from 'react';
import Tag from '../../domain/tag/Tag';

export interface TagsController {
    error: any,
    isLoaded: boolean,
    data: Tag[],
    addTag: ({name, onUpdate}) => void,
    deleteTag: ({tagId, onExecute}) => void
}

export default function useTags(): TagsController {

    const [error,setError] = useState<any>(null);
    const [isLoaded,setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<Tag[]>([]);
    const [isReaload, setIsReload] = useState<boolean>(true);

    useEffect(()=>{
        if (isReaload) {
            setIsLoaded(false);
            
            TagsRepository.getTags()
            .then(result =>{
                setError(null);
                setData(result.items.map(item => new Tag(item.tagId, item.name)));
                setIsLoaded(true);
                setIsReload(false);
            })
            .catch(error => {
                setError(error.message);
                setData([]);
                setIsLoaded(true);
                setIsReload(false);
            });
        }
    }, [isReaload]);

    let addTag = ({name, onUpdate}) => {
        setIsLoaded(false);
        TagsRepository.addTag(name)
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
        TagsRepository.deleteTag(tagId)
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