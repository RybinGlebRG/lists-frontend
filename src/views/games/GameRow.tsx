import { GamesController } from "../../controller/games/useGames";
import Game from "../../domain/game/Game";
import * as dateUtils from '../../crosscut/utils/dateUtils'


export interface GameRowProps {
    game: Game;
    gamesController: GamesController
}

export default function GameRow(props: GameRowProps){

    return (
        <div className="row">
            <div className="col">
                <div className="row" >
                    <div className="col">
                        <div className="row justify-content-left p-3">
                            <div className="col ps-0 pt-1">
                                <div className="row">
                                    <div className="col-md-auto border-end">
                                        <h6 className="font-weight-bold">{`${props.game.name}`}</h6>
                                    </div>
                                    <div className="col-md-auto">
                                        {`Created: ${dateUtils.fromDateToStringZoned(props.game.createDateUTC)}`}
                                    </div>
                                </div>                
                            </div>
                        </div>                        
                    </div>
                    <div className="col">
                        <div className="row p-3 align-items-center justify-content-end">
                            <div className="col-md-auto">
                                <button 
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => {
                                        const isDelete = window.confirm("Delete this game?")
                                        if (isDelete){
                                            props.gamesController.delete(props.game);
                                        }
                                    }}
                                    aria-label={"delete game"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash link-danger" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
