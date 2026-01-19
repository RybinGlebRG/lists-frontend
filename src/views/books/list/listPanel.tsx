import Controls from './Controls';
import Table from './Table';
import useBooks from '../../../controller/books/useBooks';

export default function ListPanel(){
	const {	error,
		isLoaded, 
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
