
export default class PostBooksRequest {

    private _JWT: string;
    private _userId: number;
    private _title: string;
    private _authorId: number | null= null;
    private _status: number;
    private _seriesId: number | null= null;
    private _order: number | null= null;
    private _lastChapter: number | null= null;
    private _bookTypeId: number | null= null;
    private _insertDate: string | null= null;
    private _note: string | null= null;
    private _URL: string | null= null;

    private constructor(
        userId: number, 
        JWT: string,
        title: string,
        authorId: number | null= null,
        status: number,
        seriesId: number | null= null,
        order: number | null= null,
        lastChapter: number | null= null,
        bookTypeId: number | null= null,
        insertDate: string | null= null,
        note: string | null= null,
        URL: string | null= null
    ) {
        this._userId = userId;
        this._JWT = JWT;
        this._title = title;
        this._authorId = authorId;
        this._status = status;
        this._seriesId = seriesId;
        this._order = order;
        this._lastChapter = lastChapter;
        this._bookTypeId = bookTypeId;
        this._insertDate = insertDate;
        this._note = note;
        this._URL = URL;
    }

    public get JWT(): string {
        return this._JWT;
    }

    public get userId(): number {
        return this._userId;
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
            insertDate: this._insertDate,
            note: this._note,
            URL: this._URL
        }

        return JSON.stringify(body);
    }

    public static builder(JWT: string, userId: number, title: string, status: number): InstanceType<typeof PostBooksRequest.Builder> {
        return new this.Builder(JWT, userId, title, status);
    }

    public static Builder = class {

        private _JWT: string;
        private _userId: number;
        private _title: string;
        private _authorId: number | null = null;
        private _status: number;
        private _seriesId: number | null= null;
        private _order: number| null= null;
        private _lastChapter: number| null= null;
        private _bookTypeId: number| null= null;
        private _insertDate: string| null= null;
        private _note: string | null= null;
        private _URL: string | null= null;

        constructor(JWT: string, userId: number, title: string, status: number) {
            this._JWT = JWT;
            this._userId = userId;
            this._title = title;
            this._status = status;
        }

        public authorId(authorId: number): this {
            this._authorId = authorId;
            return this;
        }

        public seriesId(seriesId: number): this {
            this._seriesId = seriesId;
            return this;
        }

        public order(order: number): this {
            this._order = order;
            return this;
        }

        public lastChapter(lastChapter: number): this {
            this._lastChapter = lastChapter;
            return this;
        }

        public bookTypeId(bookTypeId: number): this {
            this._bookTypeId = bookTypeId;
            return this;
        }

        public insertDate(insertDate: string): this {
            this._insertDate = insertDate;
            return this;
        }

        public note(note: string): this {
            this._note = note;
            return this;
        }

        public URL(URL: string): this {
            this._URL = URL;
            return this;
        }

        public build(): PostBooksRequest {
            return new PostBooksRequest(
                this._userId,
                this._JWT,
                this._title,
                this._authorId,
                this._status,
                this._seriesId,
                this._order,
                this._lastChapter,
                this._bookTypeId,
                this._insertDate,
                this._note,
                this._URL

            );
        }

    }

}
