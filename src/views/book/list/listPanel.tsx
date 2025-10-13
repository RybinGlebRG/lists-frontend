import Controls from '../../../readList/books/list/Controls';
import Table from '../../../readList/books/list/Table';
import useBooks from '../../../readList/books/list/useBooks';

export default function ListPanel(){
	const {	error,
		isLoaded, 
		bookList, 
		bookStatuses,
		listOrdering,
		titleSearch,
		books,
		reload, 
		switchOrdering, 
		openBookAdd,
		updateSearched
	} = useBooks();

	return (
		<div className="row">
			<div className="col">
				<Controls
					listOrdering={listOrdering}
					reload={reload}
					switchOrdering={switchOrdering}
					openBookAdd={openBookAdd}
					bookStatuses={bookStatuses}
					titleSearchValue={titleSearch}
					updateSearched={updateSearched}
				/>
				<Table
					error={error}
					isLoaded={isLoaded}
					books={books}
				/>
			</div>
		</div>
	);
}
