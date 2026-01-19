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

export function getStatusSVG({statusName}){
    let res = statusSVGMap[statusName];

    if (res == null){
        res = statusSVGMap["_fallback"];
    }

    return res;
}
