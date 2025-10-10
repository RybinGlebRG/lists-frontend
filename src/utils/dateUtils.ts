
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
				dt.getUTCMinutes().toString().padStart(2,"0");
}

export function currentDateForInputZoned(): string{
    let dt: Date = new Date();
    return dt.getFullYear() + '-' +
				(dt.getMonth()+1).toString().padStart(2,"0") + '-' +
				dt.getDate().toString().padStart(2,"0") + 'T' +
				dt.getHours().toString().padStart(2,"0") + ':' +
				dt.getMinutes().toString().padStart(2,"0");
}

export function fromString(strDate: string): Date {
    return new Date(strDate + ".000Z");
}

export function fromStringZonedToDate(strDate: string): Date {
    return new Date(strDate + ":00.000");
}

export function getCurrentDate() {
    return new Date();
}

export function fromDateToStringUTC(date: Date): string {
    let dt = new Date(date);
    return dt.getUTCFullYear() + '-' +
        (dt.getUTCMonth()+1).toString().padStart(2,"0") + '-' +
        dt.getUTCDate().toString().padStart(2,"0") + 'T' +
        dt.getUTCHours().toString().padStart(2,"0") + ':' +
        dt.getUTCMinutes().toString().padStart(2,"0") + ":00";
}

export function fromStringZonedToStringUTC(date: string): string {
    let dt = fromStringZonedToDate(date);
    return fromDateToStringUTC(dt);
}

export function fromStrinUtcToDate(date: string): Date {
    return new Date(date + ".000Z");
}

export function toStringInput(date: Date): string {
    let dt = new Date(date);
    return dt.getUTCFullYear() + '-' +
        (dt.getUTCMonth()+1).toString().padStart(2,"0") + '-' +
        dt.getUTCDate().toString().padStart(2,"0") + 'T' +
        dt.getUTCHours().toString().padStart(2,"0") + ':' +
        dt.getUTCMinutes().toString().padStart(2,"0");
}

export function fromDateToStringInputZoned(date: Date): string {
    let dt = new Date(date);
    return dt.getFullYear() + '-' +
        (dt.getMonth()+1).toString().padStart(2,"0") + '-' +
        dt.getDate().toString().padStart(2,"0") + 'T' +
        dt.getHours().toString().padStart(2,"0") + ':' +
        dt.getMinutes().toString().padStart(2,"0");
}
