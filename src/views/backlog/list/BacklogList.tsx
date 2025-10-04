import { useSelector, useDispatch } from 'react-redux'
import useBacklogItems from './useBacklogItems';
import Header from '../../../common/header';

export default function BacklogList(): JSX.Element{

    const dispatch = useDispatch();

    const { error, isLoaded, backlogItems, reload} = useBacklogItems();

    let store={
        JWT: useSelector((state: any) => state.listsReducer.JWT)
    }

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
            <div>
                LOLED
            </div>
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
                                        className="btn btn-outline-success btn-sm"
                                        onClick={()=>{
                                            alert("Not Implemented")
                                            // dispatch(openTagsAdd());
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
