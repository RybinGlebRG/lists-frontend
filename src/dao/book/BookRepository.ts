import * as BaseRepository from '../base/BaseRepository'
import SearchBooksRequest from './SearchBooksRequest';
import PostBooksRequest from './PostBooksRequest';
import PutBookRequest from './PutBookRequest';
import User from '../../domain/user/User';


export async function deleteBook(bookId: number): Promise<void> {
    
    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(`${window.location.origin}/api/v1/users/${user.id}/books/${bookId}`,
                {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }
            )
        }
    );
}

export async function loadBook(bookId: number) {
    let res = await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(`${window.location.origin}/api/v1/users/${user.id}/books/${bookId}`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }
            )
        }
    );
    let book = await res.json();

    return book;       
}

export async function postBooks(postBooksRequest: PostBooksRequest){

    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/books`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                    body: postBooksRequest.toJsonBody()
                }
            )
        }
    );
}

export async function getBookTypes(): Promise<any>{
    let bookTypes = await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v0.2/bookTypes`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }
            )
        }
    );

    bookTypes = await bookTypes.json();

    return bookTypes;   
}

export async function searchBooks(searchBooksRequest: SearchBooksRequest){

    let res = await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/books/search`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                    body: searchBooksRequest.toJsonBody()
                }
            )
        }
    );

    let bookList = await res.json();
    return bookList;
}

export async function putBook(postBookRequest: PutBookRequest){
    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/books/${postBookRequest.bookId}`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                    body: postBookRequest.toString()
                }
            )
        }
    );
}

// DEPRECATED
export async function getBookStatuses(JWT, onUnauthorized): Promise<any>{
    let res = {
        items: [
        {
            statusId: 1,
            statusName: "In progress"
        },
        {
            statusId: 2,
            statusName: "Completed"
        },
        {
            statusId: 3,
            statusName: "Expecting"
        },
        {
            statusId: 4,
            statusName: "Dropped"
        }
    ]
    }

    return res;   
}
