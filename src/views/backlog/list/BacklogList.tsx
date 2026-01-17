import { useDispatch } from 'react-redux'
import useBacklogItems from '../../../controller/backlog/useBacklogItems';
import Header from '../../common/header';
import { openBacklogItemAdd, reload } from '../../../dao/backlog/backlogSlice'
import BacklogItemRow from './BacklogItemRow';
import { JSX } from 'react';

export default function BacklogList(): JSX.Element{

    const dispatch = useDispatch();

    const { error, isLoaded, backlogItems} = useBacklogItems();

    let content: JSX.Element | null = null;
    if (error){
		content = (<div className="alert alert-danger" role="alert">{error}</div>);
	} else if (!isLoaded){
		content = (
			<div className="d-flex justify-content-center">
				<div className="spinner-border m-5" role="status">
					<span className="sr-only"/>
				</div>
			</div>
		)
	} else {
        content = (
            <ul className="list-group">
                {backlogItems.map((item) =>{		
                    return (<BacklogItemRow backlogItem={item}/>)
                })}
            </ul>
        )
    }

    return(
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <Header
                            title="Backlog"
                            buttons={[
                                (
                                    <button 
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => {
                                            dispatch(reload());
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                        </svg>
                                    </button>
                                ),
                                (
                                    <button 
                                        type="button"
                                        className="btn btn-outline-success btn-sm"
                                        onClick={()=>{
                                            dispatch(openBacklogItemAdd());
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                        </svg>
                                    </button>
                                )                                
                            ]}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}
