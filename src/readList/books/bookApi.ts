import * as commonApi from '../../common/commonApi'


export async function loadBook(JWT, listId, bookId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v0.2/readLists/${listId}/books/${bookId}`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
    let book = await res.json();

    return book;       

}

export async function postBooks(JWT, readListId, body, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v0.2/readLists/${readListId}/books`,
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

export async function getBookTypes(JWT, onUnauthorized){
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

export async function searchBooks(JWT,userId, body, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/books/search`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${JWT}`
        },
        body: JSON.stringify(body)
    });
    await commonApi.checkError(res, onUnauthorized);
    let bookList = await res.json();
    return bookList;
}

export async function getBookStatuses(JWT, onUnauthorized){
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

export async function postBook({JWT, bookId, body, onUnauthorized}){
    let res = await fetch(window.location.origin+`/api/v0.2/books/${bookId}`,
    {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${JWT}`
        },
        body: JSON.stringify(body)
    });
    await commonApi.checkError(res, onUnauthorized);
}