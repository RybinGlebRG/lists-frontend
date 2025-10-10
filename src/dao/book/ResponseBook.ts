interface SeriesResponse {
    seriesId: number,
    title: string
}

interface TagResponse {
    tagId: number,
    name: string
}

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
    tags: TagResponse[],
    textAuthors: any[],
    seriesList: SeriesResponse[],
    url: string
}
