import * as commonApi from '../../common/commonApi'


export async function loadSeriesItem(JWT, readListId, seriesId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v0.2/readLists/${readListId}/series/${seriesId}`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${JWT}`
			}
        });
        await commonApi.checkError(res, onUnauthorized);
        let series = await res.json();
        let out= {
            series
        }

        return out;
}

export async function saveSeriesItem(JWT, seriesId, body, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v0.2/series/${seriesId}`,
    {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
    await commonApi.checkError(res, onUnauthorized);
}

export async function loadSeriesList(JWT, listId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v0.2/readLists/${listId}/series`,
    {
        method: "GET",
        headers: {
            'Authorization': 'Bearer '+JWT
        }
    });
    await commonApi.checkError(res, onUnauthorized);;
    
    let seriesList = await res.json();	

    return seriesList;	
}

