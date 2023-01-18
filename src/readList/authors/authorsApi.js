import * as commonApi from '../../common/commonApi'


export async function getAuthors(JWT, readListId, onUnauthorized){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${readListId}/authors`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);

    let authors = await res.json();

    return authors;       
}