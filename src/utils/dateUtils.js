
export function postprocessValues(date){
    let dt = new Date(date+"Z");
    dt = dt.toISOString();
    return dt;
}

export function preprocessValues(date){
    let createDate=date;
            createDate = createDate+".000Z";
            createDate = new Date(createDate);
            createDate = createDate.getUTCFullYear() + '-' +
				(createDate.getUTCMonth()+1).toString().padStart(2,"0") + '-' +
				createDate.getUTCDate().toString().padStart(2,"0") + 'T' +
				createDate.getUTCHours().toString().padStart(2,"0") + ':' +
				createDate.getUTCMinutes().toString().padStart(2,"0");
    return createDate;
}
