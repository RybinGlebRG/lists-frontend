import * as dateUtils from '../../../utils/dateUtils'
import ItemRow from '../../../common/ItemRow';
import * as statuses from '../statuses';

function getMostRecentRecord({readingRecords}){
	let mostRecentRecord;

	for (let i = 0; i < readingRecords.length; i++){
		let currentRecord = readingRecords[i];
		let currentStartDate = new Date(currentRecord.startDate);

		if (mostRecentRecord != null){
			let mostRecentStartDate = new Date(mostRecentRecord.startDate);
			if (currentStartDate > mostRecentStartDate){
				mostRecentRecord = currentRecord;
			} else if (currentStartDate == mostRecentStartDate && currentRecord.recordId > mostRecentRecord.recordId){
				mostRecentRecord = currentRecord;
			}
		} else {
			mostRecentRecord = currentRecord;
		}
	}

	return mostRecentRecord;
}

export default function Table(props){
    const error = props.error;
    const isLoaded = props.isLoaded;
    const list = props.list;
    const openBook = props.openBook;
    const openBookUpdate = props.openBookUpdate;

    if (error){
		return <div class="alert alert-danger" role="alert">{error}</div>;
	} else if (!isLoaded){
		return(
			<div class="d-flex justify-content-center">
				<div class="spinner-border m-5" role="status">
					<span class="sr-only"/>
				</div>
			</div>
		)
	} else {

	return(
		<div class="row">
			<div class="col">
				<ul class="list-group">
					{list.map((item) =>{

						let tagsItems = item.tags.map(tag => (
							<div class="col-md-auto pe-0">
								<span class="badge text-bg-secondary">{tag.name}</span>
							</div>
						))

						const tags = (
							<div class="row justify-content-left ps-3">
								{tagsItems}
							</div>
						)

						const data = (
							<div class="col">					
								{item.lastChapter ? (
								<div class="row">
									<div class="col">Last chapter: {item.lastChapter}</div>
								</div>
								): null}
							</div>
						)

						const buttons = [
							{
								"onClick": ()=>{
									openBook(item.bookId);
								},
								"SVG": (
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
										<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
									</svg>
								)
							},
							{
								"onClick": ()=>{
									openBookUpdate(item.bookId);
								},
								"SVG": (
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
										<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
									</svg> 
								)
							}
						]

						const chain = item.chain.map(item=>{
							let mostRecentReadingRecord = getMostRecentRecord({readingRecords: item.readingRecords});
							let status;
							if (mostRecentReadingRecord != null){
								status = statuses.getStatusSVG({statusName: mostRecentReadingRecord.bookStatus.statusName});
							} else {
								status = statuses.getStatusSVG({statusName: "_fallback"});
							}
							
							
							return {
								"data": (
									<div class="col">
										<div class="row">
											<div class="col-auto">
												{status}
											</div>
											<div class="col ps-0">
												<p class="font-weight-bold">{item.title} {item.bookType ? "("+item.bookType.typeName+")" : null}</p>
											</div>
										</div>							
										{item.lastChapter ? (
										<div class="row">
											<div class="col">Last chapter: {item.lastChapter}</div>
										</div>
										): null}
										<div class="row">
											<div class="col">Added: {dateUtils.formatToDisplay(item.insertDate)}</div>
										</div>
										
									</div>
								),
								"buttons": [
									{
										"onClick": ()=>{
											openBook(item.bookId);
										},
										"SVG": (
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
												<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
											</svg>
										)
									},
									{
										"onClick": ()=>{
											openBookUpdate(item.bookId);
										},
										"SVG": (
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
												<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
											</svg> 
										)
									}
								]
							}
						})

						let mostRecentReadingRecord = getMostRecentRecord({readingRecords: item.readingRecords});
							let status;
							if (mostRecentReadingRecord != null){
								status = statuses.getStatusSVG({statusName: mostRecentReadingRecord.bookStatus.statusName});
							} else {
								status = statuses.getStatusSVG({statusName: "_fallback"});
							}

						let updated = dateUtils.formatToDisplay(item.lastUpdateDate);	

						return (
							<li class="list-group-item p-0">
								<ItemRow
									title={`${item.title} ${item.bookType ? "("+item.bookType.typeName+")" : null}`}
									statusIcon={status}
									data={data}
									buttons={buttons}
									chainData={chain}
									note={item.note}
									tags={tags}
									authors={item.textAuthors}
									updated={updated}
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