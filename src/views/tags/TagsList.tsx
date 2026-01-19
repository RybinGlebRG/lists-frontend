import { useDispatch } from 'react-redux'
import useTags from '../../controller/tags/useTags';
import Header from '../common/header'
import {openTagsAdd} from '../../dao/book/booksSlice'

export default function TagsList() {
    const dispatch = useDispatch();

    const {error, isLoaded, data, deleteTag} = useTags();

    let result;

    if (error){
        result=( <div className="alert alert-danger" role="alert">{error}</div>);
    } else if (!isLoaded){
        result=( 
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        );
    } else if (data != null){
        result=(
            <ul className="list-group">
                {data.map(item => {
                    return(
                        <li className="list-group-item">
                            <div className="row mt-2 mb-2 me-2">
                                <div className="col">
                                    {item.name}
                                </div>
                                <div className="col position-relative">
                                    <button 
                                        type="button" 
                                        className="btn btn-danger position-absolute top-50 end-0 translate-middle-y"
                                        onClick={()=>{
                                            const isDelete = window.confirm("Delete this book?")
                                            if (isDelete){
                                                deleteTag({tagId: item.id, onExecute: null});
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                         <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    } else {
        alert("Something went wrong")
    }

    return(
        <div className="row">
			<div className="col">
                <div className="row">
                    <div className="col">
                        <Header
                            title="Tags"
                            buttons={[
                                (
                                    <button 
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={()=>{
                                            dispatch(openTagsAdd());
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
                        {result}
                    </div>
                </div>
            </div>
		</div>
    );
}