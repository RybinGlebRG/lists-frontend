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
        let items = await res.json();
        let out= {
            items
        }

        return out;
}