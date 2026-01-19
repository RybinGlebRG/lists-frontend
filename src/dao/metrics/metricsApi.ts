import * as BaseRepository from '../base/BaseRepository'


export async function loadMetric(metricKey){
    let res = await BaseRepository.fetchWithRetry(
        (user) => {
            return fetch(window.location.origin+`/actuator/jolokia/read/${metricKey}`,
            {
              method: "GET",
              headers: {
                'Authorization': `Bearer ${user.accessToken}`
              }
                })
        }
    );

    let metric = await res.json();
    return metric;
}