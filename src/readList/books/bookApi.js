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

export async function searchBooks(JWT,readListId, body, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v0.2/readLists/${readListId}/books/search`,
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