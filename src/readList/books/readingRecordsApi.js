import * as commonApi from '../../common/commonApi';

export async function post({JWT, bookId, body, onUnauthorized}){
    let res = await fetch(window.location.origin+`/api/v0.2/books/${bookId}/readingRecords`,
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

export async function put({JWT, bookId, readingRecordId, body, onUnauthorized}){
    let res = await fetch(window.location.origin+`/api/v0.2/books/${bookId}/readingRecords/${readingRecordId}`,
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

export async function deleteOne({JWT, bookId, readingRecordId, onUnauthorized}){
    let res = await fetch(window.location.origin+`/api/v0.2/books/${bookId}/readingRecords/${readingRecordId}`,
    {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
}
