import React from 'react';
import ReadList from './readList/readList'
import WatchList from './watchList/watchList'
import SeriesMain from './series/SeriesMain'
import Header from './header.js'
import LoginPanel from './login/login.js'
import * as categories from './displayAreaCategories'
import Metrics from './metrics/metrics'
import Games from './games/main';
import { useSelector } from 'react-redux'




export default function DisplayArea(){
	const store={
		category: useSelector(state=>state.displayAreaReducer.category),
		panelType: useSelector(state=>state.listsReducer.panel),
		listType: useSelector(state=>state.listsReducer.listType)
    }

	let list;
	if (store.category === categories.READ_LIST){
		list = (<ReadList/>)
	} else if (store.category === categories.WATCH_LIST){
		list = (<WatchList/>)
	} else if (store.category === categories.SERIES_MAIN) {
		list = (<SeriesMain/>)
	} else if (store.category === categories.GAMES) {
		list = (<Games/>)
	} else if (store.category === categories.METRICS){
		list= (<Metrics/>)
	}

	list = (
		<div class="row">
			<div class="col">
				<div class="row">
					<div class="col">
						<div class="row">
							<div class="col">
								<Header/>
							</div>
						</div>
						<div class="row">
							<div class="col">
								{list}
							</div>	
						</div>
					</div>
				</div>
			</div>
		</div>
	)



	if (store.category === categories.SIGN_IN){
		list = (<LoginPanel/>)
	} 

	return (
		<div class="container-fluid h-100">
			{list}
		</div>
	)

}
