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

export async function getAuthor(JWT, authorId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/authors/${authorId}`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);

    let author = await res.json();	

    return author;
}

export async function deleteAuthor(JWT, authorId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/authors/${authorId}`,
    {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
}

export async function addAuthor(JWT, userId, body, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/authors`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${JWT}`
        },
        body: JSON.stringify(body)
    });
    await commonApi.checkError(res, onUnauthorized);
}
