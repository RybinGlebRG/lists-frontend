import * as commonApi from '../../common/commonApi'
import * as BaseRepository from '../base/BaseRepository'
import * as UserRepository from '../user/UserRepository'


export async function getAuthors(JWT, userId, onUnauthorized){

    // Get current user
    await BaseRepository.checkAndRefreshToken();
    const user = await UserRepository.getCurrentUser();

    let res = await fetch(window.location.origin+`/api/v1/users/${user.id}/authors`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);

    let authors = await res.json();

    return authors;       
}

export async function getAuthor(JWT, authorId, onUnauthorized){

    // Get current user
    await BaseRepository.checkAndRefreshToken();
    const user = await UserRepository.getCurrentUser();

    let res = await fetch(window.location.origin+`/api/v1/authors/${authorId}`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);

    let author = await res.json();	

    return author;
}

export async function deleteAuthor(JWT, authorId, onUnauthorized){

    // Get current user
    await BaseRepository.checkAndRefreshToken();
    const user = await UserRepository.getCurrentUser();

    let res = await fetch(window.location.origin+`/api/v1/authors/${authorId}`,
    {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
}

export async function addAuthor(JWT, userId, body, onUnauthorized){

    // Get current user
    await BaseRepository.checkAndRefreshToken();
    const user = await UserRepository.getCurrentUser();

    let res = await fetch(window.location.origin+`/api/v1/users/${user.id}/authors`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(body)
    });
    await commonApi.checkError(res, onUnauthorized);
}
