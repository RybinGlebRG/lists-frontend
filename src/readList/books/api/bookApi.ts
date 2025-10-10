import * as commonApi from '../../../common/commonApi'
import GetBookRequest from './GetBookRequest';
import PutBookRequest from './PutBookRequest';
import PostBooksRequest from './PostBooksRequest';
import SearchBooksRequest from './SearchBooksRequest';

export async function loadBook(getBookRequest: GetBookRequest, onUnauthorized: () => void){
    let res = await getBookRequest.execute();
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

export async function getBookStatuses(JWT, onUnauthorized): Promise<any>{
    let res = await fetch(window.location.origin+`/api/v0.2/bookStatuses`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
    res = await res.json();

    return res;   
}

export async function deleteBook(JWT, bookId, onUnauthorized){
    
    let res = await fetch(`${window.location.origin}/api/v0.2/books/${bookId}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${JWT}`
            }
        }
    );
    await commonApi.checkError(res, onUnauthorized);
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