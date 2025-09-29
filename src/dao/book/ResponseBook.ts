interface ResponseBook {
    bookId: number,
    title: string,
    bookStatus: {
        statusId: number,
        statusName: string
    },
    insertDate: string,
    lastUpdateDate: string,
    lastChapter: number | null,
    note: string | null,
    bookType: {
        typeId: number,
        typeName: string
    },
    itemType: string,
    chain: ResponseBook[],
    readingRecords: ReadingRecordResponse[],
    tags: any[],
    textAuthors: any[],
    seriesList: any[],
    url: string
}
