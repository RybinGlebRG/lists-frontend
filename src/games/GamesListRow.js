import { deleteGame } from './gamesApi';
import { useSelector, useDispatch } from 'react-redux'
import {useState} from 'react';
import {openSignIn} from '../redux/actionCreators'


export default function GamesListRow(props){
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const title = props.title;
    const gameId = props.gameId;
    const createDateUTC = props.createDateUTC;
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }

    return (
        <div class="row" >
            <div class="col">
                <div 
                    class="row justify-content-between align-items-center p-2 ps-4"
                >
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <p class="font-weight-bold">{title}</p>
                            </div>
                        </div>							
                        <div class="row">
                            <div class="col">Added: {createDateUTC}</div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div class="col d-flex justify-content-center">
                <ul class="list-group list-group-horizontal list-group-flush w-100 offset-md-4">
                    <li class="list-group-item list-group-item-action border-0 p-0">
                        <button
                            type="button"
                            class="btn btn-link w-100 h-100 border-start rounded-0"
                            onClick={()=>{
                                alert("Not implemented");
                            }}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg> 
                        </button>
                    </li>
                    <li class="list-group-item list-group-item-action border-0 p-0">
                        <button
                            type="button"
                            class="btn btn-link link-danger w-100 h-100 border-start rounded-0"
                            onClick={()=>{
                                let promises=[];
                                promises.push(deleteGame(store.JWT, gameId, ()=>{dispatch(openSignIn())}));
                                Promise.all(promises)
                                .then(([del]) =>{
                                    setError(null); 
                                })
                                .catch(err=>{
                                    setError(err.message);
                                });
                            }}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        </button>
                    </li>
                </ul>
            </div>
            {/* <div 
                class="col-md-1 border-start offset-md-4 d-flex justify-content-center align-items-center  p-0"
            >
                <button
                    type="button"
                    class="btn btn-link w-100 h-100"
                    onClick={()=>{
                        alert("Not implemented");
                    }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg> 
                </button>
                  
            </div>
            <div class="col-md-1 border-start d-flex justify-content-center align-items-center p-0">
                <button
                    type="button"
                    class="btn btn-link link-danger w-100 h-100"
                    onClick={()=>{
                        alert("Not implemented");
                    }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                </button>
            </div> */}
        </div>
    )
}