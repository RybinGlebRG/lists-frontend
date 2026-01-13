import * as commonApi from '../common/commonApi'

export async function loadList(JWT, body, userId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/games/search`,
		{
			method: "POST",
			headers: {
				'Authorization': `Bearer ${JWT}`,
                'Content-Type': 'application/json;charset=utf-8'
			},
            body: JSON.stringify(body)
        });
        await commonApi.checkError(res, onUnauthorized);
        let out = await res.json();

        return out;
}

export async function addGame(JWT, body, userId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/games`,
		{
			method: "POST",
			headers: {
				'Authorization': `Bearer ${JWT}`,
                'Content-Type': 'application/json;charset=utf-8'
			},
            body: JSON.stringify(body)
        });
        await commonApi.checkError(res, onUnauthorized);
}

export async function deleteGame(JWT, gameId, userId, onUnauthorized){
    let res = await fetch(window.location.origin+`/api/v1/users/${userId}/games/${gameId}`,
		{
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${JWT}`
			}
        });
        await commonApi.checkError(res, onUnauthorized);
}