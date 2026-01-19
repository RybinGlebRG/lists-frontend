import ListGroup from 'react-bootstrap/ListGroup';
import Header from '../../common/header'
import { useDispatch } from 'react-redux'
import useAuthorList from '../../../controller/authors/useAuthorsList';
import {openAuthor, openAuthorAdd} from '../../../dao/book/booksSlice'
import { setAuthorId } from '../../../dao/author/authorsSlice';

export default function AuthorList() {
	const dispatch = useDispatch()

	const {error, isLoaded, authors} = useAuthorList();

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
    } else if (authors != null) {
		result=(
			<ListGroup>
				{authors.map((item) =>{
						return (
							<li className="list-group-item d-flex justify-content-between list-group-item-action" 
								// action 
								onClick={() => {
									dispatch(setAuthorId({authorId: item.authorId}));
									dispatch(openAuthor());
								}}						
							>
								{item.name}
							</li>
						)
							
				})}
			</ListGroup>
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
							title="Authors"
							buttons={[
								(
									<button 
										type="button"
										className="btn btn-secondary btn-sm"
										onClick={()=>{
											dispatch(openAuthorAdd());
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
