async function checkError(result, onUnauthorized){
    if (!result.ok){
        if (result.status===401 && onUnauthorized !== undefined){
            onUnauthorized()
        } else {
            result=await result.json();
            throw new Error('Error: '+result.errorMessage);
        }
    };
}

export async function loadBook(JWT, listId, bookId, onUnauthorized){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${listId}/books/${bookId}`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${JWT}`
        }
    });
    await checkError(res, onUnauthorized);
    let book = await res.json();

    return book;       

}