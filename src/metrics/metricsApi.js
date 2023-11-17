import * as commonApi from '../common/commonApi'

export async function loadMetric(JWT,metricKey, onUnauthorized){
    let res = await fetch(window.location.origin+`/actuator/jolokia/read/${metricKey}`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${JWT}`
			}
        });
        await commonApi.checkError(res, onUnauthorized);
        let metric = await res.json();
        return metric;
}