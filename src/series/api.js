export async function loadSeriesItem(JWT, readListId, seriesId){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${readListId}/series/${seriesId}`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${JWT}`
			}
        });
        let result;
        if (!res.ok){
            result=await res.json();
            throw new Error('Error: '+result.errorMessage);
        };

        let series = await res.json();
        let out= {
            series
        }

        return out;
}

export async function saveSeriesItem(JWT, seriesId, body){
    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/series/${seriesId}`,
    {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
    let result;
    if (!res.ok){
        result=await res.json();
        throw new Error('Error: '+result.error);
    };

}

