import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import useTags from './useTags';
import Header from '../common/header'

export default function TagsList() {
    const dispatch = useDispatch();

    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        userId: useSelector(state=>state.listsReducer.userId)
    }

    const {error, isLoaded, data, addTag} = useTags();

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
                            buttons={[]}
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