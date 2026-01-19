import Game from '../../domain/game/Game';
import * as BaseRepository from '../base/BaseRepository'
import * as dateUtils from '../../crosscut/utils/dateUtils'


interface LoadListResponse {
    items: LoadListResponseItem[]
}

interface LoadListResponseItem {
    gameId: number,
    itemType: string,
    createDateUTC: string,
    title: string
}

export async function loadList(): Promise<Game[]> {
    return BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/games`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
        }
    )
    .then(res => res.json())
    .then((json: LoadListResponse) => json.items.map(item => new Game(
        item.gameId, 
        item.title, 
        dateUtils.fromStrinUtcToDate(item.createDateUTC)
    )))
}

export async function addGame(body){
    
    await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/games`,
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            })
        }
    );

}

export async function deleteGame(gameId){
    await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/games/${gameId}`,
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    );
}