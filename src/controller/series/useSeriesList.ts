import {useState, useEffect} from 'react';
import SeriesRepository from '../../dao/series/SeriesRepository';
import ISeriesList from '../../dao/series/ISeriesList';

export interface IUseSeriesListResult {
    seriesList: ISeriesList | null;
    error: string | null;
    isLoaded: boolean;
}

export default function useSeriesList(): IUseSeriesListResult {
    const [seriesRepository] = useState<SeriesRepository>(new SeriesRepository());
    const [error, setError] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [seriesList, setSeriesList] = useState<ISeriesList>({items: []});

    useEffect(()=>{
        seriesRepository.findAll()
            .then(result => {
                setError(null);
                setSeriesList(result);
                setIsLoaded(true);
            })
            .catch(error => {
                setError(error.message);
                setSeriesList({items: []});
                setIsLoaded(true);
            });
    },[]);

    return {
        seriesList,
        error,
        isLoaded
    }

}
