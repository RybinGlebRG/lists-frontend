import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import * as seriesApi from './seriesApi'
import SeriesRepository from './SeriesRepository';
import ISeriesList from './ISeriesList';
import {openSignIn} from '../../displayAreaSlice'

export interface IUseSeriesListResult {
    seriesList: ISeriesList | null;
    error: string | null;
    isLoaded: boolean;
}

export default function useSeriesList(): IUseSeriesListResult {
    const dispatch = useDispatch();

    const [seriesRepository] = useState<SeriesRepository>(new SeriesRepository(
        useSelector((state: any)=>state.listsReducer.JWT),
        useSelector((state: any)=>state.listsReducer.userId),
        ()=> dispatch(openSignIn(null))
    ));
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
