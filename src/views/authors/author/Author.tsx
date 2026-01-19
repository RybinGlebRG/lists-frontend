import useAuthor from "../../../controller/authors/useAuthor";
import Header from '../../common/header'
import {openAuthorList} from '../../../dao/book/booksSlice'
import { useDispatch } from 'react-redux'
import { JSX } from "react";

export default function Author() {

    const dispatch = useDispatch();

    const {error, isLoaded, author, deleteAuthor} = useAuthor();

    let result: JSX.Element | null= null;

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
    } else if (author != null){
        result=(
            <div className="row">
                <div className="col ">
                    <Header
                        title="Author"
                        buttons={[
                            (
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={()=>{
                                        alert('Not Implemented');
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
                                    className="btn btn-danger btn-sm"
                                        onClick={()=>{
                                            alert('Not Implemented');
                                            // this.props.openUpdateBook();
                                        }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>
                                </button>
                            ),
                            (
                                <button 
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={()=>{
                                        const isDelete = window.confirm("Delete this author?")
                                        if (isDelete){
                                            deleteAuthor({
                                                onExecute: () => dispatch(openAuthorList())
                                            });
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                            )
                        ]}
                    />
                </div>
                <div className="row">
                    <div className="col ml-2">
                        <div className="row">
                            <div className="col">
                                <h5>Name</h5>
                            </div>
                        </div>
                        <div className="row border-bottom">
                            <div className="col ml-2">
                                <p>{author.name}</p>
                            </div>                            
                        </div>
                    </div> 
                </div>              
            </div>
        )
    } else {
        alert("Something went wrong")
    }

    return (
        <div>
          {result}
        </div>
    )
}
