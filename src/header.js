import React from 'react';
// import './header.css';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
//import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import {setListType, openTitlesList, openReadList, openSeriesList} from './redux/actionCreators';

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
                                        class={`nav-link ${this.props.store.listType === "readList"? "active": null}`} 
                                        href="#"
                                        onClick={() => {
                                            this.props.openReadList();
                                        }}
                                    >Read List</a>
                                    </li>
                                    <li class="nav-item">
                                    <a 
                                        class={`nav-link ${this.props.store.listType === "watchList"? "active": null}`}
                                        href="#"
                                        onClick={() => {
                                            this.props.openTitlesList();
                                        }}
                                    >Watch List</a>
                                    </li>
                                    <li class="nav-item">
                                    <a 
                                        class={`nav-link ${this.props.store.listType === "seriesList"? "active": null}`} 
                                        href="#"
                                        onClick={()=>{
                                            this.props.openSeriesList()
                                    }}
                                    >Series</a>
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
			listType: state.listType
		}
	};
}

export default connect(
        mapStatetoProps,
        {
            setListType,
            openTitlesList,
            openReadList,
            openSeriesList
        }
        
	)(Header)