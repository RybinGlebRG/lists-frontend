export interface ISeriesItem {
    seriesId: number;
    userId: number;
    title: string;
}

export default interface ISeriesList {
    items: ISeriesItem[];
}