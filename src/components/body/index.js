/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-10-17T11:34:52+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2016-10-24T17:51:06+07:00
*/

import React, {Component} from 'react'
import {
  Grid,
  Row,
  Col,
  Panel,
  Button,
  ButtonToolbar
} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/index';
import ReactBase from 'react-base';

class Body extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row className="show-grid">
        <Col xs={12} md={12}>
          <p style={{
            left: '40%',
            fontSize: '300%',
            fontWeight: 'bold',
            position: 'fixed',
            top: '50%'
          }}>NhutJS Developer</p>
        </Col>
      </Row>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(Body);
