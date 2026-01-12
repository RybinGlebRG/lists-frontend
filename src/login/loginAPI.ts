import * as commonApi from '../common/commonApi'
import User from '../domain/user/User';

interface Response{
    id: number,
    name: string,
    token: string
}

export async function getToken(username: string, password: string): Promise<User>{
    const vals={
        "username": username,
        "password": password
    }
    let res = await fetch(
        window.location.origin+`/api/v1/users/tokens`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(vals)
        }
    );
    await commonApi.checkError(res, undefined);
    return res.json()
        .then(json => new User(json.id, json.name, json.token));
}