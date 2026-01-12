import Movie from "../../../domain/movie/Movie";
import { useSelector, useDispatch } from 'react-redux'
import {openAddTitle, openTitle} from '../../../redux/actionCreators';

export interface MovieRowProps {
    movie: Movie;
}

const statusSVGMap = {
	"1": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-circle-fill text-primary"} viewBox="0 0 16 16">
							   <circle cx="8" cy="8" r="8"/>
							</svg>
	),
	"2": (   
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-secondary" viewBox="0 0 16 16">
		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
	  </svg>                 
	),
	"_fallback": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-circle-fill text-white"} viewBox="0 0 16 16">
			<circle cx="8" cy="8" r="8"/>
		</svg>
	)
}

export function getStatusSVG({statusName}){
    let res = statusSVGMap[statusName];

    if (res == null){
        res = statusSVGMap["_fallback"];
    }

    return res;
}

export default function MovieRow(props: MovieRowProps){
    const dispatch = useDispatch();

    let status = getStatusSVG({statusName: props.movie.id.toString()});

    return (
        <div className="row">
            <div className="col">
                <div className="row" >
                    <div className="col">
                        <div className="row justify-content-left p-3">
                            <div className="col-auto">
                                {status}
                            </div>
                            <div className="col ps-0 pt-1">
                                <div className="row">
                                    <div className="col-md-auto border-end">
                                        <h6 className="font-weight-bold">{`${props.movie.name}`}</h6>
                                    </div>
                                    <div className="col-md-auto">
                                        {`Created: ${props.movie.createDateUTC}`}
                                    </div>
                                </div>                
                            </div>
                        </div>                        
                    </div>
                    <div className="col">
                        <div className="row p-3 align-items-center justify-content-end">
                            <div className="col-md-auto">
                                <button 
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => dispatch(openTitle(props.movie.id))}
                                    aria-label={"open movie"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                    </svg>
                                </button>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
