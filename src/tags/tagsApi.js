import * as commonApi from '../common/commonApi'

export async function getTags(JWT, userId, onUnauthorized) {
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/tags`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
    let data = await res.json();

    return data;      
}

export async function addTag(JWT, userId, body, onUnauthorized) {
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/tags`,
    {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${JWT}`
        },
        body: JSON.stringify(body)
    });
    commonApi.checkError(res, onUnauthorized);     
}
