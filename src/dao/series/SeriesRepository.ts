import * as BaseRepository from '../base/BaseRepository'
import User from '../../domain/user/User';

export default class SeriesRepository {

    public async findAll() {
        let res = await BaseRepository.fetchWithRetry(
                (user: User) => {
                    return fetch(window.location.origin+`/api/v1/users/${user.id}/series`,
                    {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${user.accessToken}`
                        }
                    })
                }
            );
        
        let seriesList = await res.json();	

        return seriesList;	
    }
}
