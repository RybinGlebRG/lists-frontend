export async function checkError(result, onUnauthorized){
    if (!result.ok){
        if (result.status===401 && onUnauthorized !== undefined){
            onUnauthorized()
        } else {
            result=await result.json();
            throw new Error('Error: '+result.errorMessage);
        }
    };
}