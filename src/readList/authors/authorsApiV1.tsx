import * as commonApi from '../../common/commonApi'

type Callback = () => void;

export type AuthorsGetParams = {
    JWT: string;
    userId: number;
    onUnauthorized: Callback;
}

export async function getAuthors(authorsGetParams: AuthorsGetParams){
    let res = await fetch(window.location.origin+`/api/v1/users/${authorsGetParams.userId}/authors`,
    {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authorsGetParams.JWT}`
        }
    });
    await commonApi.checkError(res, authorsGetParams.onUnauthorized);

    let authors = await res.json();

    return authors;       
}
