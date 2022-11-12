import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListPanel from './books/listPanel.js'
import SettingsPanel from '../settingsPanel.js'
import LeftMenu from './leftMenu.js' 
import SeriesList from './series/list.js'
import SeriesItem from './series/item.js'
import Book from './books/book.js'
import BookAdd from './books/add.js'
import BookEdit from './books/edit.js'
import AuthorList from './authors/list.js'
import Author from './authors/view.js'
import AuthorAdd from './authors/add.js'
import SeriesAdd from './series/addSeries.js'
import { connect } from 'react-redux'
import {SERIES_LIST, BOOK_LIST, SIGN_IN, SERIES_ITEM, BOOK, ADD_BOOK, BOOK_V2, UPDATE_BOOK, AUTHOR_LIST} from '../panels.js'
import * as panels from '../panels.js'
import {openSignIn, openBook, openBookList, openAddBook, openBookV2} from '../redux/actionCreators';


class ReadList extends React.Component{
    constructor(props){
		super(props);
		this.state={}
    }
    
    render(){
        const panel = -1;
		let displayPanel;
		if (this.props.store.panelType===BOOK_LIST){
			displayPanel= (
			<div>
				<ListPanel 
					listId = {this.props.store.listId}
					openItemPanel={this.props.openBook}
					 jwt={this.props.store.JWT}
					changePanelToLogin={() =>{
						this.props.openSignIn()
					}}
					openAddBook={this.props.openAddBook}
				/>
			</div>
			)
		} else if (this.props.store.panelType===ADD_BOOK){
			displayPanel=(<BookAdd/>)			
		} else if (panel===4){
			displayPanel=(
				<SettingsPanel
				user = {this.state.user}
				/>
			)
		} else if (this.props.store.panelType===SERIES_LIST){
            displayPanel=(<SeriesList/>)
        } else if (this.props.store.panelType===BOOK_V2){
			displayPanel=(<Book/>)
		} else if (this.props.store.panelType===SERIES_ITEM){
			displayPanel=(<SeriesItem/>)
		} else if (this.props.store.panelType===UPDATE_BOOK){
			displayPanel=(<BookEdit/>)
		} else if (this.props.store.panelType===panels.AUTHOR_LIST){
			displayPanel=(<AuthorList/>)
		} else if (this.props.store.panelType===panels.AUTHOR){
			displayPanel=(<Author/>)
		}else if (this.props.store.panelType===panels.AUTHOR_ADD){
			displayPanel=(<AuthorAdd/>)
		} else if (this.props.store.panelType===panels.SERIES_ADD){
			displayPanel=(<SeriesAdd/>)
		}


        let leftMenu;
		if (this.props.store.panelType !== SIGN_IN) {
			leftMenu = (<LeftMenu/>)
		}

        return(
            <Row>
                <Col bsPrefix="col-md-2 pr-5">
                    {leftMenu}
                </Col>
                <Col bsPrefix="col-md-10 pr-5">
                    {displayPanel}
                </Col>	
            </Row>
        )
    }
}

const mapStatetoProps = (state) => {
	return {
		store: {
			panelType: state.panel,
			JWT: state.JWT,
			listId: state.listId,
			bookId: state.book.bookId,
			listType: state.listType
		}
	};
}

export default connect(
    mapStatetoProps,
    {
        openSignIn,
        openBook,
        openBookList,
        openAddBook,
        openBookV2
    }
)(ReadList)