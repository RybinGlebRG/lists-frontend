import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListPanel from './books/listPanel.js'
import SettingsPanel from '../settingsPanel.js'
import LeftMenu from './leftMenu.js' 
import Book from './books/book.js'
import BookAdd from './books/add.js'
import BookEdit from './books/edit.js'
import AuthorList from './authors/list.js'
import Author from './authors/view.js'
import AuthorAdd from './authors/add.js'
import { connect } from 'react-redux'
import * as panels from '../panels.js'
import * as bookForms from './books/forms.js'
import {openBookAdd, openBook} from './books/booksSlice.js'
import {openSignIn} from '../displayAreaSlice.js'


class ReadList extends React.Component{
    constructor(props){
		super(props);
		this.state={}
    }
    
    render(){
        const panel = -1;
		let displayPanel;
		if (this.props.store.bookForm===bookForms.SHOW_LIST){
			displayPanel= (<ListPanel/>)
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
			JWT: state.loginReducer.JWT,
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
		openBookAdd
    }
)(ReadList)