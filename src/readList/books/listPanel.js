import Controls from './list/Controls';
import Table from './list/Table';
import useBooks from './list/useBooks';

export default function ListPanel(){
	const {	error,
		isLoaded, 
		bookList, 
		bookStatuses,
		listOrdering,
		titleSearch,
		openBook, 
		reload, 
		switchOrdering, 
		openBookAdd,
		openBookUpdate,
		updateSearched
	} = useBooks();

	return (
		<div class="row">
			<div class="col">
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
					list={bookList}
					openBook={openBook}
					openBookUpdate={openBookUpdate}
				/>
			</div>
		</div>
	);
}
