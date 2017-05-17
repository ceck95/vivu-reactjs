import React, { Component } from 'react';
import loadStatus from '../../../../const/load-status';

class Step extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataCheckout) {
      this.setState({
        showCheckout: nextProps.dataCheckout.showCheckout
      });
    }
  }

  render() {
    return (
      <div className="container main main-other">
        <div className="order-process">
          <div className="step-label">
            <span>Địa chỉ giao hàng</span>
            <span className="step_number">1</span>
          </div>
          <div className={ `step-line ${this.state.showCheckout ?'active':''}` }></div>
          <div className="step-label">
            <span>Thanh toán và đặt mua</span>
            <span className="step_number">2</span>
          </div>
        </div>
      </div>
      );
  }

}

Step.propTypes = {
  name: React.PropTypes.string
};

export default Step;
