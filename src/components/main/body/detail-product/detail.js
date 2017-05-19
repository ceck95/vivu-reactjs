/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-17T10:20:45+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T22:47:28+07:00
 */

import React, { Component } from 'react';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProductDetail: {}
    }
  }

  componentWillMount() {
    this.setState({
      dataProductDetail: this.props.dataProductDetail
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataProductDetail: nextProps.dataProductDetail
    });
  }

  createMarkup() {
    return {
      __html: this.state.dataProductDetail.details
    };
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className="detail-info tabs-wrap tabs-wrap-secondary">
          <ul className="tabs">
            <li data-tab="tabs-content-1" className="tabs_btn col-xs-4 active">Chi tiết sản phẩm</li>
          </ul>
          <div className="tabs-content">
            <div id="tabs-content-1" className="tabs-content_wrap active">
              <div dangerouslySetInnerHTML={ this.createMarkup() } />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Detail;
