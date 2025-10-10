import SeriesItemTypesEnum from "./SeriesItemTypesEnum";

export default class SeriesItemType {
    private static readonly typeEnum = {
        "0": new SeriesItemType(0, "Book"),
        "1": new SeriesItemType(1, "Movie"),
        "2": new SeriesItemType(2, "Game") 
    }

    private _id: number;
    private _name: string;

    public constructor(
        id: number,
        name: string
    ) {
        this._id = id;
        this._name = name;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public static findById(id: number): SeriesItemType {
        return this.typeEnum[`${id}`];
    }

    public static findByType(typeEnum: SeriesItemTypesEnum): SeriesItemType {
        return this.typeEnum[typeEnum];
    }

}
