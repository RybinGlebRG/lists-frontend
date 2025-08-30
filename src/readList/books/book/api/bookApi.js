import * as commonApi from '../../../../common/commonApi'


export async function getReadingRecords({JWT, bookId, onUnauthorized}){
    let res = await fetch(window.location.origin+`/api/v0.2/books/${bookId}/readingRecords`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await commonApi.checkError(res, onUnauthorized);
    let readingRecords = await res.json();

    return readingRecords;       

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