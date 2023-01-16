import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as metricsApi from './metricsApi'

export default function Metrics(props) {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [metrics,setMetrics] = useState(null);
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
    }
    const metricKeys=["ru.rerumu.lists:name=MonitoringService"]

    useEffect(()=>{
        let promises=[];
        promises.push(metricsApi.loadMetric(store.JWT,metricKeys[0]));

        Promise.all(promises)
        .then(([values]) =>{
            setMetrics(values);
            setError(null);
            setIsLoaded(true);   
        })
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});


    },[])

    let display;

    if (!isLoaded){
        display=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                    <span class="sr-only"/>
                </div>
            </div>);
    } else if (error){
        display=( <div class="alert alert-danger" role="alert">{error}</div>);
    } else {
        display=(
            <pre>{JSON.stringify(metrics,null,4)}</pre>            
        )
    }

    return (
        <div class="row">
            <div class="col">
                {display}
            </div>
        </div>
    )


}