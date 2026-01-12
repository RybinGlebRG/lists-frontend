export default class Movie {
    private _id: number;
    private _name: string;
    private _createDateUTC: Date;
    private _watchListId: number;
    private _statusId: number;
    private _videoType: string;
    private _itemType: string;

    public constructor(
        id: number,
        name: string,
        createDateUTC: Date,
        watchListId: number,
        statusId: number,
        videoType: string,
        itemType: string
    ) {
        this._id = id;
        this._name = name;
        this._createDateUTC = createDateUTC;
        this._watchListId = watchListId;
        this._statusId = statusId;
        this._videoType = videoType;
        this._itemType = itemType;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get createDateUTC() {
        return this._createDateUTC;
    }

    public get watchListId() {
        return this._watchListId;
    }

    public get statusId() {
        return this._statusId;
    }

    public get videoType() {
        return this._videoType;
    }

    public get itemType() {
        return this._itemType;
    }
}
