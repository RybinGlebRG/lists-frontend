import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    openBookList, openAuthorList
} from './books/booksSlice.js'
import { useDispatch } from 'react-redux'


export default function LeftMenu(){
    const dispatch = useDispatch();

    return (
        <Row><Col>
        <Row>
            <Col>
            <div class="mt-4 mb-4"
            >BROWSE</div>
            </Col>
        </Row>

        <Row>
            <Col>
        <Nav defaultActiveKey="1" className="flex-column" variant="pills">
            <Nav.Item>
                <Nav.Link 
                    eventKey="1"
                    onSelect={()=>{
                        dispatch(openBookList());
                    }}
                >Book List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link 
                    eventKey="3"
                    onSelect={()=>{
                        dispatch(openAuthorList());
                    }}
                >Author List</Nav.Link>
            </Nav.Item>
        </Nav>
        </Col>
        </Row>
        </Col></Row>
        
    )
}
