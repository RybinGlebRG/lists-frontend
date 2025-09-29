import { BookStatus } from "../bookstatus/BookStatus";
import * as dt from '../../utils/dateUtils';

export default class ReadingRecord {

    private _id: number | null;
    private _bookId: number;
    private _bookStatus: BookStatus | null;
    private _startDate: Date;
    private _endDate: Date | null;
    private _lastChapter: number | null;

    public constructor(
        id: number | null,
        bookId: number,
        bookStatus: BookStatus | null,
        startDate: Date,
        endDate: Date | null,
        lastChapter: number | null
    ) {
        this._id = id;
        this._bookId = bookId;
        this._bookStatus = bookStatus;
        this._startDate = startDate;
        this._endDate = endDate;
        this._lastChapter = lastChapter;
    }

    public get id() {
        return this._id;
    }

    public get bookId() {
        return this._bookId;
    }

    public get bookStatus() {
        return this._bookStatus;
    }

    public get startDate() {
        return this._startDate;
    }

    public set startDate(date: Date) {
        this._startDate = date;
    }

    public get endDate() {
        return this._endDate;
    }

    public get endDateStr() {
        return this._endDate != null ? dt.formatToDisplayDate(this._endDate) : null;
    }

    public get lastChapter() {
        return this._lastChapter;
    }

}
