import React from 'react';
import './header.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
//import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import {setListType, openTitlesList, openReadList} from './redux/actionCreators';

class Header extends React.Component{

    render(){
        return(
            <Row>
                <Col>
                    <Navbar>
                        <Navbar.Brand>Lists</Navbar.Brand>
                        <Nav defaultActiveKey="1">
                            <Nav.Link
                                eventKey="1"
                                onSelect={()=>{
                                    this.props.openReadList();
                                }}
                            >Read List</Nav.Link>
                            <Nav.Link
                                eventKey="2"
                                onSelect={()=>{
                                    this.props.openTitlesList();
                                }}
                            >Watch List</Nav.Link>
                            <Nav.Link
                                eventKey="3"
                                onSelect={()=>{
                                    alert('Not Implemented')
                                }}
                            >Settings</Nav.Link>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
        )
    }
}

const mapStatetoProps = (state) => {
	return {
		store: {
			JWT: state.JWT,
			listId: state.listId,
            bookId: state.book.bookId,
            error: state.book.error,
            isLoaded: state.book.isLoaded,
            title: state.book.title,
            authorName: state.book.authorName,
            authorId: state.book.authorId,
            statusName: state.book.statusName,
            lastChapter: state.book.lastChapter,
            seriesTitle: state.book.seriesTitle,
            seriesOrder: state.book.seriesOrder
		}
	};
}

export default connect(
        mapStatetoProps,
        {
            setListType,
            openTitlesList,
            openReadList
        }
        
	)(Header)