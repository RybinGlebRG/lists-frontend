import * as BaseRepository from '../dao/base/BaseRepository'


export async function loadList(watchListId){
    let res = await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v0.2/watchLists/${watchListId}/titles`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    );

    let list = await res.json();

    return list;       

}