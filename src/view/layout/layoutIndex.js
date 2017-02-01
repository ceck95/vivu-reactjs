/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-10-17T11:34:33+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2016-12-05T12:32:00+07:00
*/

import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/index';
import ReactBase from 'react-base';

class LayoutIndex extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        {this.props.children}
      </Grid>
    )
  }
}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(LayoutIndex)
