import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import useTags from './useTags';
import Header from '../common/header'
import {openTagsAdd} from '../readList/books/booksSlice'

export default function TagsList() {
    const dispatch = useDispatch();

    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        userId: useSelector(state=>state.listsReducer.userId)
    }

    const [error, isLoaded, data, addTag, deleteTag] = useTags();

    let result;

    if (error){
        result=( <div class="alert alert-danger" role="alert">{error}</div>);
    } else if (!isLoaded){
        result=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                    <span class="sr-only"/>
                </div>
            </div>
        );
    } else {
        result=(
            <ul class="list-group">
                {data.map(item => {
                    return(
                        <li class="list-group-item">
                            <div class="row mt-2 mb-2 me-2">
                                <div class="col">
                                    {item.name}
                                </div>
                                <div class="col position-relative">
                                    <button 
                                        type="button" 
                                        class="btn btn-danger position-absolute top-50 end-0 translate-middle-y"
                                        onClick={()=>{
                                            const isDelete = window.confirm("Delete this book?")
                                            if (isDelete){
                                                deleteTag({tagId: item.tagId});
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                         <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return(
        <div class="row">
			<div class="col">
                <div class="row">
                    <div class="col">
                        <Header
                            title="Tags"
                            buttons={[
                                (
                                    <button 
                                        type="button"
                                        class="btn btn-secondary btn-sm"
                                        onClick={()=>{
                                            dispatch(openTagsAdd());
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                        </svg>
                                    </button>
                                )
                            ]}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        {result}
                    </div>
                </div>
            </div>
		</div>
    );
}