import * as commonApi from '../common/commonApi'


export async function loadList(JWT, watchListId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v0.2/watchLists/${watchListId}/titles`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
    let list = await res.json();

    return list;       

}