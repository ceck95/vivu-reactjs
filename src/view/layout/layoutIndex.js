/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-10-17T11:34:33+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-02T21:27:02+07:00
*/

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/index';
import ReactBase from 'react-base';
import Components from '../../components/index';

import loadStatus from '../../const/load-status';

class LayoutIndex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataCategoryGroup: [],
			dataSetting: {},
			load: false
		}
	}

	componentWillMount() {
		this.props.actions.getCategoryGroup();
		this.props.actions.getSetting();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loadingPage.loadingCategoryGroup) {
			if (nextProps.categoryGroup.length > 0) {
				this.setState({
					dataCategoryGroup: nextProps.categoryGroup
				});
			}
		}

		if (nextProps.dataSetting.loadStatus === loadStatus.assignDataLoad) {
			this.setState({
				dataSetting: nextProps.dataSetting,
				load: true
			});
			this.props.actions.setStatusDataSetting(loadStatus.available);
		}
	}

	render() {
		if (this.state.load && this.state.dataCategoryGroup.length > 0) {
			return (
				<div>
      <Components.header/>
      { this.props.children }
      <Components.footer/>
    </div>
			)
		}

		return (
			<div className="container-fluid index-loading">
     <div className="box-loading">
       <div className="row">
         <div className="col-md-12">
           <div className="box-index-header"></div>
         </div>
       </div>
			 <div className="row">
         <div className="col-md-2 menu-loading">
           <div className="box-index-menu"></div>
         </div>
				 <div className="col-md-10 slide-loading">
           <div className="box-index-slide"></div>
         </div>
       </div>
			 <div className="row">
         <div className="col-md-10 menu-loading">
           <div className="box-index-title"></div>
           <div className="box-index-body"></div>
         </div>
				 <div className="col-md-2 slide-loading">
           <div className="box-index-correlative"></div>
         </div>
       </div>
			 <div className="row">
         <div className="col-md-12">
           <div className="box-index-header"></div>
         </div>
       </div>
     </div>
   </div>
		)
	}

}

let mapRedux = new ReactBase.helpers.mapRedux({
	actions: actions,
	bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(LayoutIndex)
