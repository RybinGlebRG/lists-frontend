import {
    openBookList, 
    openAuthorList,
    openTags
} from '../../../dao/book/booksSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../dao/redux/store'
import * as booksForms from './../forms'


export default function LeftMenu(){
    const dispatch = useDispatch();

    const store={
		bookForm: useSelector((state: RootState)=>state.booksReducer.form)
    }

    return (
        <div className='row'>
            <div className='col'>
                <div className='row'>
                    <div className='col'>
                        <div className="mt-4 mb-4"
                        >BROWSE</div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <ul className="nav nav-underline flex-column">
                            <li className='nav-item'>
                                <a
                                    className={`nav-link ${store.bookForm === booksForms.SHOW_LIST ? "active": null}`}
                                    href="#"
                                    onClick={()=>{
                                        dispatch(openBookList());
                                    }}
                                >Book List</a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={`nav-link ${store.bookForm === booksForms.SHOW_AUTHOR_LIST ? "active": null}`}
                                    href="#"
                                    onClick={()=>{
                                        dispatch(openAuthorList());
                                    }}
                                >Author List</a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={`nav-link ${store.bookForm === booksForms.TAGS ? "active": null}`}
                                    href="#"
                                    onClick={()=>{
                                        dispatch(openTags());
                                    }}
                                >Tags</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
