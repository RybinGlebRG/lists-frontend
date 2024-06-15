import React from 'react';
import ListPanel from './books/listPanel.js'
import LeftMenu from './leftMenu.js' 
import Book from './books/book/book.js'
import BookAdd from './books/add.js'
import BookEdit from './books/book/BookEdit.js'
import AuthorList from './authors/list.js'
import Author from './authors/view.js'
import AuthorAdd from './authors/add.js'
import * as bookForms from './books/forms.js'
import { useSelector } from 'react-redux'


export default function ReadList(){
	const store={
		bookForm: useSelector(state=>state.booksReducer.form)
    }

	let displayPanel;
	if (store.bookForm===bookForms.SHOW_LIST){
		displayPanel= (<ListPanel/>)
	} else if (store.bookForm===bookForms.SHOW_BOOK_ADD){
		displayPanel=(<BookAdd/>)			
	} else if (store.bookForm===bookForms.SHOW_BOOK){
		displayPanel=(<Book/>)
	} else if (store.bookForm===bookForms.SHOW_BOOK_UPDATE){
		displayPanel=(<BookEdit/>)
	} else if (store.bookForm===bookForms.SHOW_AUTHOR_LIST){
		displayPanel=(<AuthorList/>)
	} else if (store.bookForm===bookForms.SHOW_AUTHOR){
		displayPanel=(<Author/>)
	}else if (store.bookForm===bookForms.SHOW_AUTHOR_ADD){
		displayPanel=(<AuthorAdd/>)
	}

	let leftMenu = (<LeftMenu/>);

	return(
		<div class="row">
			<div class="col-md-2 pr-5">
				{leftMenu}
			</div>
			<div class="col-md-10 pr-5">
				{displayPanel}
			</div>	
		</div>
	)
}
