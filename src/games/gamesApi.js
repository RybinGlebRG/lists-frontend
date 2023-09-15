import * as commonApi from '../common/commonApi'

export async function loadList(JWT, body, userId, onUnauthorized){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/users/${userId}/games/search`,
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
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/users/${userId}/games`,
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

export async function deleteGame(JWT, gameId, onUnauthorized){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/games/${gameId}`,
		{
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${JWT}`
			}
        });
        await commonApi.checkError(res, onUnauthorized);
}