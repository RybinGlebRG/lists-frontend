import React from 'react';
import ListPanel from './list/listPanel'
import LeftMenu from './list/leftMenu' 
import Book from './book/book'
import BookAdd from './add/add'
import BookEdit from './edit/BookEdit'
import AuthorList from '../authors/list/list'
import Author from '../authors/author/Author'
import AuthorAdd from '../authors/add/add'
import TagsList from '../tags/TagsList';
import TagsAdd from '../tags/TagsAdd';
import * as bookForms from './forms'
import { useSelector } from 'react-redux'
import { RootState } from '../../dao/redux/store';


export default function ReadList(){
	const store={
		bookForm: useSelector((state: RootState)=>state.booksReducer.form)
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
	} else if (store.bookForm===bookForms.SHOW_AUTHOR_ADD){
		displayPanel=(<AuthorAdd/>)
	} else if (store.bookForm===bookForms.TAGS){
		displayPanel=(<TagsList/>)
	} else if (store.bookForm===bookForms.TAGS_ADD){
		displayPanel=(<TagsAdd/>)
	}

	let leftMenu = (<LeftMenu/>);

	return(
		<div className="row">
			<div className="col-md-1 pr-5">
				{leftMenu}
			</div>
			<div className="col-md-10 pr-5">
				{displayPanel}
			</div>	
		</div>
	)
}
