
export function postprocessValues(date: string): string{
    return new Date(date+"Z").toISOString();
}

export function postprocessValuesDate(date: string): Date{
    return new Date(date+"Z");
}

export function preprocessValues(date){
    let createDate=date;
    createDate = createDate+".000Z";
    createDate = new Date(createDate);
    createDate = createDate.getUTCFullYear() + '-' +
        (createDate.getUTCMonth()+1).toString().padStart(2,"0") + '-' +
        createDate.getUTCDate().toString().padStart(2,"0") + 'T' +
        createDate.getUTCHours().toString().padStart(2,"0") + ':' +
        createDate.getUTCMinutes().toString().padStart(2,"0") + ":" +
        createDate.getSeconds().toString().padStart(2,"0");
    return createDate;
}


// DD.MM.YYYY HH24:MI:SS
export function formatToDisplay(date: string): string{
    let createDate: Date = new Date(date);
    return createDate.getDate().toString().padStart(2,"0")
        +"."+(createDate.getUTCMonth()+1).toString().padStart(2,"0")
        +"."+createDate.getFullYear()
        +" "+createDate.getHours().toString().padStart(2,"0")
        +":"+createDate.getMinutes().toString().padStart(2,"0")
        +":"+createDate.getSeconds().toString().padStart(2,"0");
}

export function formatToDisplayDate(date: Date): string{
    let createDate: Date = new Date(date);
    return createDate.getDate().toString().padStart(2,"0")
        +"."+(createDate.getUTCMonth()+1).toString().padStart(2,"0")
        +"."+createDate.getFullYear()
        +" "+createDate.getHours().toString().padStart(2,"0")
        +":"+createDate.getMinutes().toString().padStart(2,"0")
        +":"+createDate.getSeconds().toString().padStart(2,"0");
}

export function currentDate(): string{
    let dt: Date = new Date();
    return dt.getUTCFullYear() + '-' +
				(dt.getUTCMonth()+1).toString().padStart(2,"0") + '-' +
				dt.getUTCDate().toString().padStart(2,"0") + 'T' +
				dt.getUTCHours().toString().padStart(2,"0") + ':' +
				dt.getUTCMinutes().toString().padStart(2,"0")+ ":" +
                dt.getSeconds().toString().padStart(2,"0");
}
