import * as commonApi from '../common/commonApi'

// async function checkError(result, onUnauthorized){
//     if (!result.ok){
//         if (result.status===401 && onUnauthorized !== undefined){
//             onUnauthorized()
//         } else {
//             result=await result.json();
//             throw new Error('Error: '+result.errorMessage);
//         }
//     };
// }

export async function loadSeriesItem(JWT, readListId, seriesId, onUnauthorized){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${readListId}/series/${seriesId}`,
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
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/series/${seriesId}`,
    {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
    // if (!res.ok){
    //     if (res.status===401 && onUnauthorized !== undefined){
    //         onUnauthorized()
    //     } else {
    //         result=await res.json();
    //         throw new Error('Error: '+result.error);
    //     }
    // };
    await commonApi.checkError(res, onUnauthorized);
}

export async function loadSeriesList(JWT, listId, onUnauthorized){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${listId}/series`,
    {
        method: "GET",
        headers: {
            'Authorization': 'Bearer '+JWT
        }
    });
    await commonApi.checkError(res, onUnauthorized);;
    // if (!res.ok){
    //     if (res.status===401 && onUnauthorized !== undefined){
    //         onUnauthorized()
    //     } else {
    //         throw new Error('Some network error');
    //     }
    // } else {
    //     let seriesList = await res.json();	

    //     return seriesList;	
    // }
    let seriesList = await res.json();	

    return seriesList;	
}

