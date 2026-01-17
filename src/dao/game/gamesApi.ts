import * as BaseRepository from '../base/BaseRepository'


export async function loadList(body){
    let res = await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/games/search`,
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

    let out = await res.json();

    return out;
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