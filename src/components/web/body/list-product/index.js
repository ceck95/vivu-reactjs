/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-02T21:51:01+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-09T20:21:17+07:00
*/

import React, {Component} from 'react';
//components
import LeftMenuListProduct from './left-menu-list-product';
import BodyPageListProduct from './body-page-list-product';
import BreadCrumb from '../common/breadcrumb'

//map props
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';
import {helpers} from 'react-base';

class MainListProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataBreadCrumb: []
    }
  }

  componentWillMount() {
    this.setBreadCrumb(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setBreadCrumb(nextProps);
  }

  setBreadCrumb(props) {
    let dataBreadCrumb = [];
    if (props.categoryGroup.length > 0 && this.state.dataBreadCrumb.length === 0 || this.props.params.urlKeyCategoryGroup !== props.params.urlKeyCategoryGroup || this.props.params.urlKeyCategory !== props.params.urlKeyCategory) {
      props.categoryGroup.forEach(e => {
        if (e.urlKey === props.params.urlKeyCategoryGroup) {
          if (props.params.urlKeyCategory) {
            dataBreadCrumb.push({name: e.name, urlKey: e.urlKey, currentLink: false});
            e.categories.forEach(a => {
              if (a.urlKey === props.params.urlKeyCategory) {
                dataBreadCrumb.push({name: a.name, urlKey: a.urlKey, currentLink: true});
              }
            });
          } else {
            dataBreadCrumb.push({name: e.name, urlKey: e.urlKey, currentLink: true});
          }
        }
      });
      this.setState({dataBreadCrumb: dataBreadCrumb});
    }
  }

  render() {
    return (
      <div className="container main main-other">
        <BreadCrumb dataBreadCrumb={this.state.dataBreadCrumb}/>
        <BodyPageListProduct dataCategoryGroup={this.props.categoryGroup} actions ={this.props.actions} params={this.props.params} dataBreadCrumb={this.state.dataBreadCrumb}/>
      </div>
    )
  }

}

let mapRedux = new ReactBase.helpers.mapRedux({actions: actions, bindActionCreators: bindActionCreators});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(MainListProduct);
