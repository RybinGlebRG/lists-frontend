import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListPanel from './books/listPanel.js'
import SettingsPanel from '../settingsPanel.js'
import LeftMenu from './leftMenu.js' 
import SeriesList from '../series/list.js'
import SeriesItem from '../series/item.js'
import Book from './books/book.js'
import BookAdd from './books/add.js'
import BookEdit from './books/edit.js'
import AuthorList from './authors/list.js'
import Author from './authors/view.js'
import AuthorAdd from './authors/add.js'
import SeriesAdd from '../series/addSeries.js'
import { connect } from 'react-redux'
import * as panels from '../panels.js'
import {openSignIn, openBook, openBookList, openAddBook, openBookV2} from '../redux/actionCreators';
import * as bookForms from './books/forms.js'


class ReadList extends React.Component{
    constructor(props){
		super(props);
		this.state={}
    }
    
    render(){
        const panel = -1;
		let displayPanel;
		if (this.props.store.bookForm===bookForms.SHOW_LIST){
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
		} else if (this.props.store.bookForm===bookForms.SHOW_BOOK_ADD){
			displayPanel=(<BookAdd/>)			
		} else if (panel===4){
			displayPanel=(
				<SettingsPanel
				user = {this.state.user}
				/>
			)
        } else if (this.props.store.bookForm===bookForms.SHOW_BOOK){
			displayPanel=(<Book/>)
		// } else if (this.props.store.panelType===panels.UPDATE_BOOK){
		// 	displayPanel=(<BookEdit/>)
		} else if (this.props.store.bookForm===bookForms.SHOW_BOOK_UPDATE){
			displayPanel=(<BookEdit/>)
		} else if (this.props.store.bookForm===bookForms.SHOW_AUTHOR_LIST){
			displayPanel=(<AuthorList/>)
		} else if (this.props.store.bookForm===bookForms.SHOW_AUTHOR){
			displayPanel=(<Author/>)
		}else if (this.props.store.bookForm===bookForms.SHOW_AUTHOR_ADD){
			displayPanel=(<AuthorAdd/>)
		}


        let leftMenu;
		if (this.props.store.panelType !== panels.SIGN_IN) {
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
			panelType: state.listsReducer.panel,
			JWT: state.listsReducer.JWT,
			listId: state.listsReducer.listId,
			bookId: state.listsReducer.book.bookId,
			listType: state.listsReducer.listType,
			bookForm: state.booksReducer.form
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