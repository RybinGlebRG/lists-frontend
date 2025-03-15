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

    const [error, isLoaded, data, addTag] = useTags();

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
                        <li class="list-group-item">{item.name}</li>
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