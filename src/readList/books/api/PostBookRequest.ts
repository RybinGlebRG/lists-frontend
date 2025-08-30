
export default class PostBookRequest {

    private _JWT: string;
    private _userId: number;
    private _bookId: number;

    private _title: string;
    private _status: number;
    private _lastChapter: number | null= null;
    private _insertDateUTC: Date | null= null;
    private _note: string | null= null;
    private _URL: string | null= null;
    private _tagIds: number[];
    private _readingRecords: number[] = [];
    private _authorId: number | null= null;
    private _bookTypeId: number | null= null;
    private _seriesId: number | null= null;
    private _order: number | null= null;

    public constructor(
        userId: number, 
        JWT: string,
        bookId: number,
        title: string,
        authorId: number | null= null,
        status: number,
        seriesId: number | null= null,
        order: number | null= null,
        lastChapter: number | null= null,
        bookTypeId: number | null= null,
        insertDateUTC: Date | null= null,
        note: string | null= null,
        URL: string | null= null,
        readingRecords: number[] = [],
        tagIds: number[] = []
    ) {
        this._userId = userId;
        this._JWT = JWT;
        this._bookId = bookId;
        this._title = title;
        this._authorId = authorId;
        this._status = status;
        this._seriesId = seriesId;
        this._order = order;
        this._lastChapter = lastChapter;
        this._bookTypeId = bookTypeId;
        this._insertDateUTC = insertDateUTC;
        this._note = note;
        this._URL = URL;
        this._readingRecords = readingRecords;
        this._tagIds = tagIds;
    }

    public get JWT(): string {
        return this._JWT;
    }

    public get userId(): number {
        return this._userId;
    }

    public get bookId(): number {
        return this._bookId;
    }

    public toJsonBody(): string {
        const body = {
            title: this._title,
            authorId: this._authorId,
            status: this._status,
            seriesId: this._seriesId,
            order: this._order,
            lastChapter: this._lastChapter,
            bookTypeId: this._bookTypeId,
            insertDateUTC: this._insertDateUTC,
            note: this._note,
            URL: this._URL,
            readingRecords: this._readingRecords,
            tagIds: this._tagIds
        }

        return JSON.stringify(body);
    }

}
