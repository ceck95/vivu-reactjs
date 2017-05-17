import React, { Component } from 'react';

/**
 * Map props for Redux
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../actions/index';
import ReactBase from 'react-base';
import { helpers } from 'react-base';

/**
 * import component
 */
import Step from './step';
import Address from './address';
import Method from './method';

/**
 * const 
 */

import loadStatus from '../../../../const/load-status';
import loadStatusComponent from '../../../../const/load-status-component';

class CheckOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listAddress: [],
      showCheckout: false
    }
  }

  componentWillMount() {
    if (this.props.dataAddress.listAddress.length > 0) {
      this.props.actions.changeStatusAddress(loadStatus.assignDataLoad);
    }
    this.getAddressIsAuthenticated(this.props);
  }

  componentDidMount() {}

  componentWillUpdate() {}

  componentDidUpdate() {}

  getAddressIsAuthenticated(props) {
    if (props.dataLogin.isAuthenticated && props.dataAddress.statusLoadListAddress === null) {
      this.props.actions.getListAddress();
      this.props.actions.changeStatusAddress(loadStatus.startLoad);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataCheckout.loadStatus === loadStatus.assignDataLoad) {
      this.setState({
        showCheckout: nextProps.dataCheckout.showCheckout
      });
      this.props.actions.changeStatusCheckout(loadStatus.available);
      this.props.actions.changeStatusAddress(loadStatus.assignDataLoad);
    }
    this.getAddressIsAuthenticated(nextProps);
    if (nextProps.dataQuote.loadDataCartStatus === loadStatusComponent.checkProductViewCheckout || nextProps.dataQuote.loadDataCartStatus === loadStatusComponent.assignDataCart) {
      this.props.actions.checkProduct(nextProps.dataQuoteCart);
      this.props.actions.updateDataQuote(nextProps.dataQuote, helpers.Data.assign(nextProps.dataQuote, {
        loadDataCartStatus: loadStatus.available
      }));
    }
  }

  componentWillUnmount() {
    this.props.actions.setAddressToCheckout({}, false, loadStatus.assignDataLoad);
  }

  render() {

    return (
      <div>
        <Step dataCheckout={ this.props.dataCheckout } />
        <hr/>
        <div className="container main">
          { this.state.showCheckout ?
            <Method actions={ this.props.actions } dataAddress={ this.props.dataAddress } dataCheckout={ this.props.dataCheckout } dataQuote={ this.props.dataQuote } dataQuoteCart={ this.props.dataQuoteCart }
            /> :
            <Address listAddress={ this.state.listAddress } actions={ this.props.actions } dataCheckout={ this.props.dataCheckout } dataAddress={ this.props.dataAddress } dataLogin={ this.props.dataLogin }
            /> }
        </div>
      </div>
      );

  }

}

CheckOut.propTypes = {
  actions: React.PropTypes.object
};

let mapRedux = new ReactBase.helpers.mapRedux({
  actions: actions,
  bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(CheckOut);