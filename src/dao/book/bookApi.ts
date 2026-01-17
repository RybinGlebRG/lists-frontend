import User from '../../domain/user/User';
import * as BaseRepository from '../base/BaseRepository'


export async function postBook({bookId, body}){
    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return  fetch(window.location.origin+`/api/v1/users/${user.id}/books/${bookId}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${user.accessToken}`
                },
                body: JSON.stringify(body)
            })
        }
    );
}