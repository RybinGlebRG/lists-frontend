import {useState, useEffect} from 'react';  
import * as metricsApi from '../../dao/metrics/metricsApi'

export default function Metrics(props) {
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [metrics,setMetrics] = useState(null);
    const metricKeys=["ru.rerumu.lists:name=MonitoringService"]

    useEffect(()=>{
        metricsApi.loadMetric(metricKeys[0])
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
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only"/>
                </div>
            </div>);
    } else if (error){
        display=( <div className="alert alert-danger" role="alert">{error}</div>);
    } else {
        display=(
            <pre>{JSON.stringify(metrics,null,4)}</pre>            
        )
    }

    return (
        <div className="row">
            <div className="col">
                {display}
            </div>
        </div>
    )


}