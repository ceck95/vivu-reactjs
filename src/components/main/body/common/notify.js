/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-10T15:20:54+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-11T18:27:47+07:00
 */

import React, {Component} from 'react';

import {helpers} from 'react-base';

class Notify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataNotify: {}
    }
  }

  componentWillMount() {
    if (this.props.dataNotify
      ? Object.keys(this.props.dataNotify).length > 0
      : false) {
      this.handleNotify(this.props);
    }
  }

  handleNotify(props) {
    this.setState({dataNotify: props.dataNotify});
    this.props.actions.setDataNotify(helpers.Data.assign(props.dataNotify, {show: false}));

    // setTimeout(() => {
    //   this.props.actions.setDataNotify(helpers.Data.assign(props.dataNotify, {show: false}))
    // }, 5000);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataNotify.show
  //     ? Object.keys(nextProps.dataNotify).length > 0
  //     : false) {
  //     this.handleNotify(nextProps);
  //   }
  // }

  render() {
    if (this.state.dataNotify) {
      return (
        <div className="col-xs-10 col-sm-6 col-md-4 col-lg-3 notify notify-fixed notify-left">
          <div className={`notify_wrap ${this.state.dataNotify.types === 'errors'
            ? 'notify-error'
            : 'notify-success'}`}>
            <button className="notify_btn-close"></button>
            <div className="col-xs-2 notify_left">
              <span className="">
                <i className="fa fa-check" aria-hidden="true"></i>
              </span>
            </div>
            <div className="col-xs-10 notify_right">
              <div className="notify_text">
                <p className="primary">{this.state.dataNotify.uiMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div></div>
    )

  }

}

export default Notify;
