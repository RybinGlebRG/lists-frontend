import * as dateUtils from '../../../utils/dateUtils'
import ItemRow from '../../../common/ItemRow';

const statusSVGMap = {
	"In progress": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-primary"} viewBox="0 0 16 16">
							   <circle cx="8" cy="8" r="8"/>
							</svg>
	),
	"Completed": (   
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-secondary" viewBox="0 0 16 16">
		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
	  </svg>                 
	),
	"Expecting": (  
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill text-warning" viewBox="0 0 16 16">
		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
	  </svg>               
	),
	"Dropped": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill text-secondary" viewBox="0 0 16 16">
		<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
		</svg>
	),
	"_fallback": (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-white"} viewBox="0 0 16 16">
			<circle cx="8" cy="8" r="8"/>
		</svg>
	)
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
						const status = statusSVGMap[item.bookStatus.statusName];
						const data = (
							<div class="col">						
								{item.lastChapter ? (
								<div class="row">
									<div class="col">Last chapter: {item.lastChapter}</div>
								</div>
								): null}
								<div class="row">
									<div class="col">Added: {dateUtils.formatToDisplay(item.insertDate)}</div>
								</div>
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
							const status = statusSVGMap[item.bookStatus.statusName];
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

						return (
							<li class="list-group-item p-0">
								<ItemRow
									title={`${item.title} ${item.bookType ? "("+item.bookType.typeName+")" : null}`}
									statusIcon={statusSVGMap[item.bookStatus.statusName]}
									data={data}
									buttons={buttons}
									chainData={chain}
									note={item.note}
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