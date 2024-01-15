import {openSignIn} from '../displayAreaSlice'
import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import { loadList, deleteGame } from './gamesApi';
import Header from '../common/header'
import { openGamesAdd, setNeedReload } from './gamesSlice'
import * as dateUtils from '../utils/dateUtils'
import ItemRow from '../common/ItemRow'



export default function GamesList(){
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [games,setGames] = useState(null);
    let store={
        JWT: useSelector(state=>state.loginReducer.JWT),
        isNeedReload: useSelector(state=>state.gamesReducer.isNeedListReload)
        // TODO: Add userId
    }

    if (store.isNeedReload){
        setIsLoaded(false);

        let promises=[];
        promises.push(loadList(store.JWT, {}, 1, ()=>{dispatch(openSignIn())}));

        Promise.all(promises)
        .then(([games]) =>{
            setGames(games.items);
            setError(null);
            setIsLoaded(true);   
        })
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});

        dispatch(setNeedReload({isNeedListReload: false}))
    }

    useEffect(()=>{
        let promises=[];
        promises.push(loadList(store.JWT, {}, 1, ()=>{dispatch(openSignIn())}));

        Promise.all(promises)
        .then(([games]) =>{
            setGames(games.items);
            setError(null);
            setIsLoaded(true);   
        })
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});


    },[])

    let header=(
        <div class="row">
                <div class="col">
                    <Header
                        title="Games"
                        buttons={[
                            (
                                <button 
                                    type="button"
                                    class="btn btn-secondary btn-sm"
                                    onClick={()=>{
                                        dispatch(setNeedReload({isNeedListReload: true}))
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                    </svg>
                                </button>
                            ),
                            (
                                <button 
                                    type="button"
                                    class="btn btn-success btn-sm"
                                        onClick={()=>{
                                           dispatch(openGamesAdd());
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
    )

    let display;

    if (!isLoaded){
        display=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                    <span class="sr-only"/>
                </div>
            </div>);
    } else if (error){
        display=( <div class="alert alert-danger" role="alert">{error}</div>);
    } else {
        const rows=games.map(item=>{
            let note;
            if (item.note !== undefined){
                note=(
                    <div class="row">
                        <div class="col">Note: {item.note}</div>
                    </div>
                )
            }
            const data = (
                <div class="col">							
                    <div class="row">
                        <div class="col">Added: {dateUtils.formatToDisplay(item.createDateUTC)}</div>
                    </div>
                    {note}
                </div>
            )
            const buttons = [
                {
                    "onClick": ()=>{
                        alert("Not implemented");
                    },
                    "SVG": (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg> 
                    )
                },
                {
                    "onClick": ()=>{
                        const isDelete = window.confirm("Delete this game?")
                        if (isDelete){
                            let promises=[];
                            promises.push(deleteGame(store.JWT, item.gameId, ()=>{dispatch(openSignIn())}));
                            Promise.all(promises)
                            .then(([del]) =>{
                                setError(null); 
                                dispatch(setNeedReload({isNeedListReload: true}))
                            })
                            .catch(err=>{
                                setError(err.message);
                            });
                        }
                    },
                    "SVG": (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash link-danger" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    )
                }
            ]

            return (
                <li 
                    class="list-group-item p-0"
                >
                    <ItemRow
                        title={item.title}
                        data={data}
                        buttons={buttons}
                        note={item.note}
                    />
                </li>
        )
        })

        display=(
            <div class="row">
                <div class="col">
                    <ul class="list-group">
                        {rows}
                    </ul>
                </div>
            </div>
        )
    }

    return(
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        {header}
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        {display}
                    </div>
                </div>
            </div>
        </div>
    )
}