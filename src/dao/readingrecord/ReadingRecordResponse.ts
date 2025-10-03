interface ReadingRecordResponse {
    recordId: number,
    bookId: number,
    bookStatus: {
        statusId: number,
        statusName: string
    },
    startDate: string,
    endDate: string | null,
    isMigrated: boolean,
    lastChapter: number | null
}