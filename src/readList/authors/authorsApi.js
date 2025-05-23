import * as commonApi from '../../common/commonApi'


export async function getAuthors(JWT, userId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/authors`,
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