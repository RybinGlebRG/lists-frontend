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

export async function put({JWT, readingRecordId, body, onUnauthorized}){
    let res = await fetch(window.location.origin+`/api/v0.2/readingRecords/${readingRecordId}`,
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