/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-10-17T11:34:52+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-16T08:13:08+07:00
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

import Slide from './slide/index';
import Body from './body/home/index';

import '../../static/sass/main.sass';
import '../../static/css/slide-codrops.css';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    if (this.props.categoryGroup.length > 0) {
      return (
        <div>
          <Slide/>
          <Body/>
        </div>
      )
    }

    return (
      <div>Loading</div>
    )

  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(Main);
