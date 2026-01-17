import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import TitlesList from '../views/movies/list/titlesList'
import TitleAdd from './titleAdd'
import Title from './title'
import TitleEdit from './titleEdit'
import {ADD_TITLE, TITLES_LIST, TITLE, UPDATE_TITLE} from '../views/panels'


class WatchList extends React.Component{
    constructor(props){
		super(props);
		this.state={}
    }

    render(){
        let displayPanel;

        if (this.props.store.panelType === TITLES_LIST){
            displayPanel=(
                <TitlesList/>
            )
        } else if (this.props.store.panelType === ADD_TITLE){
            displayPanel=(
                <TitleAdd/>
            )
        } else if (this.props.store.panelType === TITLE){
            displayPanel=(
                <Title/>
            )
        } else if (this.props.store.panelType === UPDATE_TITLE){
            displayPanel=(
                <TitleEdit/>
            )
        }

        
        

        return(
            <Row className="justify-content-center">
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
			listType: state.listsReducer.listType
		}
	};
}

export default connect(
    mapStatetoProps
)(WatchList)