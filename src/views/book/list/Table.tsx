import BookRow from '../../../readList/books/list/BookRow';
import Book from '../../../domain/book/Book';

interface TableProps {
	books: Book[];
	error: any;
	isLoaded: boolean;
}

export default function Table(props: TableProps){
    const error = props.error;
    const isLoaded = props.isLoaded;
	const books: Book[] = props.books;

    if (error){
		return <div className="alert alert-danger" role="alert">{error}</div>;
	} else if (!isLoaded){
		return(
			<div className="d-flex justify-content-center">
				<div className="spinner-border m-5" role="status">
					<span className="sr-only"/>
				</div>
			</div>
		)
	} else {

	return(
		<div className="row">
			<div className="col">
				<ul className="list-group">
					{books.map((item) =>{		
						return (
							<li 
								className="list-group-item p-0" 
								key={item.id}
								aria-label={item.title}
							>
								<BookRow
									book={item}
									isChain={false}
								/>
							</li>
						)
					})}
				</ul>
			</div>
		</div>	
	);
	}
}