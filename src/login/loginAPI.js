import * as commonApi from '../common/commonApi'

export async function getToken(username, password){
    const vals={
        "username": username,
        "password": password
    }
    let res = await fetch(
        window.env.BACKEND_ADDR_V2+`/api/v0.2/users/tokens`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(vals)
        }
    );
    await commonApi.checkError(res);
    let token = await res.json();

    return token;
}