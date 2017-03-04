/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-10-17T11:34:33+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-02T21:27:02+07:00
*/

import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/index';
import ReactBase from 'react-base';
import Components from '../../components/index';

class LayoutIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataCategoryGroup: []
    }
  }

  componentWillMount() {
    this.props.actions.getCategoryGroup();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadingPage.loadingCategoryGroup) {
      if (nextProps.categoryGroup.length > 0) {
        this.setState({dataCategoryGroup: nextProps.categoryGroup});
      }
    }
  }

  render() {
    if (this.state.dataCategoryGroup.length > 0) {
      return (
        <div>
          <Components.header/> {this.props.children}
          <Components.footer/>
        </div>
      )
    }

    return (
      <div>Loading</div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(LayoutIndex)
