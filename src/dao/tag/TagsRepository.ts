import * as BaseRepository from '../base/BaseRepository'


export async function getTags() {
    let res = await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/tags`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    );

    let data = await res.json();

    return data;      
}

export async function addTag(name: string) {

    const requestBody = {
        name: name
    }

    await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/tags`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${user.accessToken}`
                },
                body: JSON.stringify(requestBody)
            })
        }
    );
}

export async function deleteTag(tagId: number) {
    await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/api/v1/users/${user.id}/tags/${tagId}`,
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
        }
    );
}
