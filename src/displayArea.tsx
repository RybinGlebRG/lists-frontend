import ReadList from './readList/readList'
import WatchList from './watchList/watchList'
import SeriesMain from './series/SeriesMain'
import Header from './header'
import LoginPanel from './login/login.js'
import * as categories from './displayAreaCategories'
import Metrics from './metrics/metrics'
import Games from './games/main';
import Backlog from './views/backlog/Backlog'
import { useSelector } from 'react-redux'

type Props = {
  class?: string
}

export default function DisplayArea(): JSX.Element {
	const store={
		category: useSelector((state: any) => state.displayAreaReducer.category),
		panelType: useSelector((state: any) => state.listsReducer.panel),
		listType: useSelector((state: any) => state.listsReducer.listType)
    }

	let list: JSX.Element | null = null;
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
	} else if (store.category === categories.BACKLOG) {
		list = (<Backlog/>)
	}

	list = (
		<div className="row">
			<div className="col">
				<div className="row">
					<div className="col">
						<div className="row">
							<div className="col">
								<Header/>
							</div>
						</div>
						<div className="row">
							<div className="col">
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
		<div className="container-fluid h-100">
			{list}
		</div>
	)

}
