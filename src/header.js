import React from 'react';
import { connect } from 'react-redux'
import {setListType, openTitlesList, openReadList, openSeriesList} from './redux/actionCreators';
import {openCategory} from './displayAreaSlice'
import * as categories from './displayAreaCategories'

class Header extends React.Component{

    render(){
        return(
            <div class="row">
                <div class="col">
                    <nav class="navbar navbar-expand-lg bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Lists</a>
                            <button 
                                class="navbar-toggler" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#navbarNav" 
                                aria-controls="navbarNav" 
                                aria-expanded="false" 
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                    <a 
                                        class={`nav-link ${this.props.store.listType === categories.READ_LIST? "active": null}`} 
                                        href="#"
                                        onClick={() => {
                                            this.props.openReadList();
                                            this.props.openCategory(categories.READ_LIST);
                                        }}
                                    >Read List</a>
                                    </li>
                                    <li class="nav-item">
                                    <a 
                                        class={`nav-link ${this.props.store.listType === categories.WATCH_LIST? "active": null}`}
                                        href="#"
                                        onClick={() => {
                                            this.props.openTitlesList();
                                            this.props.openCategory(categories.WATCH_LIST);
                                        }}
                                    >Watch List</a>
                                    </li>
                                    <li class="nav-item">
                                    <a 
                                        class={`nav-link ${this.props.store.listType === categories.SERIES_MAIN? "active": null}`} 
                                        href="#"
                                        onClick={()=>{
                                            this.props.openSeriesList()
                                            this.props.openCategory(categories.SERIES_MAIN);
                                    }}
                                    >Series</a>
                                    </li>

                                    <li class="nav-item">
                                    <a 
                                        class={`nav-link ${this.props.store.listType === categories.GAMES? "active": null}`}  
                                        href="#"
                                        onClick={()=>{
                                            this.props.openCategory(categories.GAMES);
                                        }}
                                    >Games</a>
                                    </li>

                                    <li class="nav-item">
                                    <a 
                                        class="nav-link" 
                                        href="#"
                                        onClick={()=>{
                                        alert('Not Implemented')
                                    }}
                                    >Settings</a>
                                    </li>

                                    <li class="nav-item">
                                    <a 
                                        class={`nav-link ${this.props.store.category === categories.METRICS? "active": null}`} 
                                        href="#"
                                        onClick={()=>{
                                            this.props.openCategory(categories.METRICS);
                                    }}
                                    >Metrics</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
	return {
		store: {
			listType: state.listsReducer.listType,
            category: state.displayAreaReducer.category
		}
	};
}

export default connect(
        mapStatetoProps,
        {
            setListType,
            openTitlesList,
            openReadList,
            openSeriesList,
            openCategory
        }
        
	)(Header)