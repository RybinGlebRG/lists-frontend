import BookType from "../bookType/BookType";

export class BookStatus {

    private _statusId: number;
    private _statusName: string;

    public constructor(
        statusId: number,
        statusName: string
    ) {
        this._statusId = statusId;
        this._statusName = statusName;


    }

    public get statusId() {
        return this._statusId;
    }

    public get statusName() {
        return this._statusName;
    }

}

export default class Book {
    
    private _id: number;
    private _title: string;
    private _bookStatus: BookStatus;
    private _insertDate: Date;
    private _lastUpdateDate: Date;
    private _lastChapter: number | null;
    private _note: string | null;
    private _bookType: BookType | null;
    private _itemType: string;
    private _chain: Book[];
    private _readingRecords: any[];
    private _tags: any[];
    private _textAuthors: any[];
    private _seriesList: any[];
    private _URL: string | null;

    public constructor(
        id: number,
        title: string,
        bookStatus: BookStatus,
        insertDate: Date,
        lastUpdateDate: Date,
        lastChapter: number | null,
        note: string | null,
        bookType: BookType | null,
        itemType: string,
        chain: Book[],
        readingRecords: any[],
        tags: any[],
        textAuthors: any[],
        seriesList: any[],
        URL: string | null
    ) {
        this._id = id;
        this._title = title;
        this._bookStatus = bookStatus;
        this._insertDate = insertDate;
        this._lastUpdateDate = lastUpdateDate;
        this._lastChapter = lastChapter;
        this._note = note;
        this._bookType = bookType;
        this._itemType = itemType;
        this._chain = chain;
        this._readingRecords = readingRecords;
        this._tags = tags;
        this._textAuthors = textAuthors;
        this._seriesList = seriesList;
        this._URL = URL;
    }

    public get id() {
        return this._id;
    }

    public get title() {
        return this._title;
    }

    public get bookStatus() {
        return this._bookStatus;
    }

    public get insertDate() {
        return this._insertDate;
    }

    public get lastUpdateDate() {
        return this._lastUpdateDate;
    }

    public get lastChapter() {
        return this._lastChapter;
    }

    public get note() {
        return this._note;
    }

    public get bookType() {
        return this._bookType;
    }

    public get itemType() {
        return this._itemType;
    }

    public get chain() {
        return this._chain;
    }

    public get readingRecords() {
        return this._readingRecords;
    }

    public get tags() {
        return this._tags;
    }

    public get textAuthors() {
        return this._textAuthors;
    }

    public get seriesList() {
        return this._seriesList;
    }

    public get URL() {
        return this._URL;
    }
}
