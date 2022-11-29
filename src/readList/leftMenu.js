import React from 'react';
import { connect } from 'react-redux'
import {openSeriesList, openBookList, openAuthorList} from '../redux/actionCreators.js'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class LeftMenu extends React.Component{

    render(){

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
                            this.props.openBookList()
                        }}
                    >Book List</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link 
                        eventKey="2"
                        onSelect={()=>{
                            this.props.openSeriesList()
                        }}
                    >Series List</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <Nav.Link 
                        eventKey="3"
                        onSelect={()=>{
                            this.props.openAuthorList()
                        }}
                    >Author List</Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            </Row>
            </Col></Row>
            
        )
    }
}

// export default LeftMenu;

export default connect(
	null,
	{ openSeriesList, openBookList,openAuthorList }
  )(LeftMenu)