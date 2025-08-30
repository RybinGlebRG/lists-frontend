export async function checkError(result, onUnauthorized: () => void){
    if (!result.ok){
        if (result.status===401 && onUnauthorized !== undefined){
            onUnauthorized()
        } else {
            result=await result.json();
            let errorText=`${result.errorMessage}\\n
            ${result.error}
            `
            throw new Error(errorText);
        }
    };
}

export async function checkUnauthorized(result, onUnauthorized: () => void){
    if (!result.ok){
        if (result.status===401 && onUnauthorized !== undefined){
            onUnauthorized()
        }
    };
}