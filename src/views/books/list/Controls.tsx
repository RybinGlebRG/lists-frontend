export default function Controls(props){
    const listOrdering = props.listOrdering; 
    const reload = props.reload; 
    const switchOrdering = props.switchOrdering;
    const openBookAdd = props.openBookAdd; 
    const bookStatuses = props.bookStatuses; 
    const titleSearchValue = props.titleSearchValue; 
	const updateSearched = props.updateSearched;

    let bookOrdering;

	if (listOrdering==="DESC"){
		bookOrdering = (
			<button 
					type="button"
					className="btn btn-secondary btn-sm"
						onClick={switchOrdering}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
						<path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
					</svg>
			</button>
		)
	} else {
		bookOrdering = (
			<button 
					type="button"
					className="btn btn-secondary btn-sm"
						onClick={switchOrdering}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down-alt" viewBox="0 0 16 16">
						<path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
					</svg>
			</button>
		)
	}

	let bookStatusesCheckboxes;
	
	if (bookStatuses != null){
		bookStatusesCheckboxes = bookStatuses.map(item=>{
			let input;
			if (item.checked){
				input = (
					<input className="form-check-input" type="checkbox" value="" checked id="flexCheckDefault" onClick={()=>{
						if (item.checked){
							item.checked=false;
						} else {
							item.checked=true;
						}
						reload();
					}}/>
				)
			} else {
				input = (
					<input className="form-check-input" type="checkbox" value=""  id="flexCheckDefault" onClick={()=>{
						if (item.checked){
							item.checked=false;
						} else {
							item.checked=true;
						}
						reload();
					}}/>
				)
			}

			let res = (
				<div className="form-check form-check-inline">
					<label className="form-check-label" htmlFor="flexCheckDefault">{item.statusName}</label>
					{input}
				</div>
			)
			return res;
		})
	}

	let searchTitleSearchField=(
		<input className="form-control" 
			type="text" 
			placeholder="Title"
			name="title"
			onChange={event=> {
				updateSearched(event.target.value);
			}}
			value={titleSearchValue}
		/>
	)

	let controls=(
		<div className="row">
			<div className="col">
			<div className="row">
				<div className="col pb-2 mt-4 mb-2 border-bottom">			
					<div className="row">
						<div className="col">
							<h3>Book List</h3>
						</div>
						<div className="col-md-auto">
								<button 
									type="button"
									className="btn btn-secondary btn-sm"
										onClick={reload}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
										<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
									</svg>
							</button>
						</div>
						<div className="col-md-auto">
								<button 
									type="button"
									className="btn btn-success btn-sm"
										onClick={openBookAdd}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
										<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
									</svg>
							  </button>
							</div>
					</div>
					
				</div>	
			</div>
			<div className="row">
				<div className="col pb-2 mt-2 mb-2 border-bottom">	
					<div className="row row-cols-auto">
						<div className="col ms-4">
							{bookOrdering}
						</div>
						<div className="col ms-4">
							{bookStatusesCheckboxes}
						</div>
						<div className="col ms-4">
							{searchTitleSearchField}
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
	)

	return controls;
}