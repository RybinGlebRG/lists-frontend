import { useDispatch } from 'react-redux'
import Header from '../common/header'
import { openGamesAdd } from '../../dao/game/gamesSlice'
import useGames, { GamesController } from '../../controller/games/useGames';
import { JSX } from 'react';
import Game from '../../domain/game/Game';
import GameRow from './GameRow';


export default function GamesList(){
    const dispatch = useDispatch();

    const gamesController: GamesController = useGames();

    let header=(
        <div className="row">
                <div className="col">
                    <Header
                        title="Games"
                        buttons={[
                            (
                                <button 
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={()=>{
                                        gamesController.reload();
                                    }}
                                    aria-label="reload"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                    </svg>
                                </button>
                            ),
                            (
                                <button 
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={()=>{
                                        dispatch(openGamesAdd());
                                    }}
                                    aria-label="add game"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </button>
                            )
                        ]}
                    />
                </div>
            </div>
    )

    let display: JSX.Element | null = null;

    if (!gamesController.isLoaded){
        display=( 
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only"/>
                </div>
            </div>);
    } else if (gamesController.error){
        display=( <div className="alert alert-danger" role="alert">{gamesController.error}</div>);
    } else if (gamesController.games != null){
        const rows=gamesController.games.map((item: Game) => {
            return (
                <li 
                    className="list-group-item p-0"
                >
                    <GameRow
                        game={item}
                        gamesController={gamesController}
                    />
                </li>
        )
        })

        display=(
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        {rows}
                    </ul>
                </div>
            </div>
        )
    } else {
        alert("Something went wrong")
    }

    return(
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        {header}
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {display}
                    </div>
                </div>
            </div>
        </div>
    )
}