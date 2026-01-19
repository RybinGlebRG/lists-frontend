import User from '../../domain/user/User';
import * as BaseRepository from '../base/BaseRepository'


export async function getAuthors(){

    let res = await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/authors`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }
            )
        }
    );

    let authors = await res.json();

    return authors;       
}

export async function getAuthor(authorId: number){

    let res = await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v1/authors/${authorId}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    );


    let author = await res.json();	

    return author;
}

export async function deleteAuthor(authorId: number){

    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v1/authors/${authorId}`,
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    )
}

export async function addAuthor(body){

    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/authors`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${user.accessToken}`
                },
                body: JSON.stringify(body)
            })
        }
    )
}
