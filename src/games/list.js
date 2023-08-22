import {
    openSignIn,
    // openSeriesItemShow
} from '../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import { loadList } from './gamesApi';
import Header from '../common/header'


export default function GamesList(){
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [games,setGames] = useState(null);
    const [isNeedReload, setIsNeedReload] = useState(false);
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        user: useSelector(state=>state.listsReducer.user)
    }

    if (isNeedReload){
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

        setIsNeedReload(false);
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
                                        setIsNeedReload(true);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
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

        display=(
            <div class="row">
                <div class="col">
            
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