import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import * as commonApi from '../../common/commonApi'
import * as BaseRepository from '../base/BaseRepository'
import * as UserRepository from '../user/UserRepository'
import SearchBooksRequest from '../../readList/books/api/SearchBooksRequest';
import PostBooksRequest from '../../readList/books/api/PostBooksRequest';
import PutBookRequest from '../../readList/books/api/PutBookRequest';


export async function deleteBook(
    bookId: number,
    onUnauthorized: () => void
): Promise<void> {

    BaseRepository.checkAndRefreshToken();
    const user = await UserRepository.getCurrentUser();
    
    let res = await fetch(`${window.location.origin}/api/v1/users/${user.id}/books/${bookId}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }
    );
    await commonApi.checkError(res, onUnauthorized);
}

export async function loadBook(bookId: number, onUnauthorized: () => void){

    BaseRepository.checkAndRefreshToken();
    const user = await UserRepository.getCurrentUser();

    let res = await fetch(`${window.location.origin}/api/v1/users/${user.id}/books/${bookId}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }
    );
    await commonApi.checkError(res, onUnauthorized);
    let book = await res.json();

    return book;       

}

export async function postBooks(postBooksRequest: PostBooksRequest, onUnauthorized: () => void){
    let res = await fetch(window.location.origin+`/api/v1/users/${postBooksRequest.userId}/books`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${postBooksRequest.JWT}`
        },
        body: postBooksRequest.toJsonBody()
    });
    await commonApi.checkError(res, onUnauthorized);
}

export async function getBookTypes(JWT, onUnauthorized): Promise<any>{
    let bookTypes = await fetch(window.location.origin+`/api/v0.2/bookTypes`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(bookTypes, onUnauthorized);
    bookTypes = await bookTypes.json();

    return bookTypes;   
}

export async function searchBooks(searchBooksRequest: SearchBooksRequest, onUnauthorized: () => void){
    let res = await fetch(window.location.origin+`/api/v1/users/${searchBooksRequest.userId}/books/search`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${searchBooksRequest.JWT}`
        },
        body: searchBooksRequest.toJsonBody()
    });
    await commonApi.checkError(res, onUnauthorized);
    let bookList = await res.json();
    return bookList;
}

export async function putBook(postBookRequest: PutBookRequest, onUnauthorized: () => void){
    let res = await fetch(window.location.origin+`/api/v1/users/${postBookRequest.userId}/books/${postBookRequest.bookId}`,
    {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${postBookRequest.JWT}`
        },
        body: postBookRequest.toString()
    });
    await commonApi.checkError(res, onUnauthorized);
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
