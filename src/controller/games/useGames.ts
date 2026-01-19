import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import * as GamesRepository from '../../dao/game/GamesRepository'
import { RootState } from '../../dao/redux/store';
import Game from '../../domain/game/Game';

export interface GamesController {
    error: any,
    isLoaded: boolean,
    games: Game[],
    reload: () => void,
    delete: (game: Game) => void
}

export default function useGames(): GamesController{

    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isReload, setReload] = useState<boolean>(true);

    useEffect(()=>{
        if (isReload) {
            setIsLoaded(false);
            GamesRepository.loadList()
            .then((games) => {
                setGames(games);
                setError(null);
            })
            .catch(err=>{
                setError(err.message);
            })
            .finally( () => {
                setIsLoaded(true);   
                setReload(false);
            });

        }
    }, [isReload]);

    return {
        error,
        isLoaded,
        games,
        reload: () => setReload(true),
        delete: (game: Game) => {

            setIsLoaded(false);

            GamesRepository.deleteGame(game.id)
            .then(() =>{
                setError(null);
                setIsLoaded(true);
                setReload(true)
            })
            .catch(err=>{
                setError(err.message);
                setIsLoaded(true);
            });
        }
    }

}
