import * as BaseRepository from '../base/BaseRepository'


export async function loadSeriesItem(readListId, seriesId){
    let res = await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v0.2/readLists/${readListId}/series/${seriesId}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    );

    let series = await res.json();
    let out= {
        series
    }

    return out;
}

export async function saveSeriesItem(seriesId, body){
    await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v0.2/series/${seriesId}`,
            {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            })
        }
    );
}

export async function loadSeriesList(){
    let res = await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/series`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    );
    
    let seriesList = await res.json();	

    return seriesList;	
}

