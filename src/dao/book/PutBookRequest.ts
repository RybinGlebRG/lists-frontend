
export class ReadingRecordPutView {
    private _readingRecordId: number | null;
    private _statusId: number;
    private _startDate: string;
    private _endDate: string | null;
    private _lastChapter: number | null;

    public constructor(
        readingRecordId: number | null,
        statusId: number,
        startDate: string,
        endDate: string | null,
        lastChapter: number | null
    ) {
        this._readingRecordId = readingRecordId;
        this._statusId = statusId;
        this._startDate = startDate;
        this._endDate = endDate;
        this._lastChapter = lastChapter;
    }

    public get readingRecordId(): number | null {
        return this._readingRecordId;
    }

    public get statusId(): number {
        return this._statusId;
    }

    public get startDate() {
        return this._startDate;
    }

    public get endDate() {
        return this._endDate;
    }

    public get lastChapter(): number | null {
        return this._lastChapter;
    }

    public toJsonBody(): any {
        const body = {
            readingRecordId: this._readingRecordId,
            statusId: this._statusId,
            startDate: this._startDate,
            endDate: this._endDate,
            lastChapter: this._lastChapter
        }

        return body;
    }

}


export default class PutBookRequest {

    private _bookId: number;

    private _title: string;
    private _status: number;
    private _lastChapter: number | null= null;
    private _insertDateUTC: string | null= null;
    private _note: string | null= null;
    private _URL: string | null= null;
    private _tagIds: number[];
    private _readingRecords: ReadingRecordPutView[] = [];
    private _authorId: number | null= null;
    private _bookTypeId: number | null= null;
    private _seriesIds: number[];
    private _order: number | null= null;

    public constructor(
        bookId: number,
        title: string,
        authorId: number | null= null,
        status: number,
        seriesIds: number[] = [],
        order: number | null= null,
        lastChapter: number | null= null,
        bookTypeId: number | null= null,
        insertDateUTC: string | null= null,
        note: string | null= null,
        URL: string | null= null,
        readingRecords: ReadingRecordPutView[] = [],
        tagIds: number[] = []
    ) {
        this._bookId = bookId;
        this._title = title;
        this._authorId = authorId;
        this._status = status;
        this._seriesIds = seriesIds;
        this._order = order;
        this._lastChapter = lastChapter;
        this._bookTypeId = bookTypeId;
        this._insertDateUTC = insertDateUTC;
        this._note = note;
        this._URL = URL;
        this._readingRecords = readingRecords;
        this._tagIds = tagIds;
    }

    public get bookId(): number {
        return this._bookId;
    }

    public toJsonBody(): any {
        const body = {
            title: this._title,
            authorId: this._authorId,
            status: this._status,
            seriesIds: this._seriesIds,
            order: this._order,
            lastChapter: this._lastChapter,
            bookTypeId: this._bookTypeId,
            insertDateUTC: this._insertDateUTC,
            note: this._note,
            URL: this._URL,
            readingRecords: this._readingRecords.map(item => item.toJsonBody()),
            tagIds: this._tagIds
        }

        return body;
    }

    public toString(): string {
        return JSON.stringify(this.toJsonBody());
    }

}
