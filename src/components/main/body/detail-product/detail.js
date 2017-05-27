/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-17T10:20:45+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T22:47:28+07:00
 */

import React, { Component } from 'react';
import config from '../../../../config/index';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProductDetail: {},
      activeTabDetail: true,
      urlCommentFace: ''
    }
  }

  componentWillMount() {
    this.handleValue(this.props);
  }

  handleValue(props) {
    this.setState({
      dataProductDetail: props.dataProductDetail,
      activeTabDetail: true,
      urlCommentFace: window.location.href
    });
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.handleValue(nextProps);
    }

  }

  createMarkup() {
    return {
      __html: this.state.dataProductDetail.details
    };
  }

  tabs(detail) {
    if (detail) {
      this.setState({
        activeTabDetail: true
      })
      window.FB.XFBML.parse();
    } else {
      this.setState({
        activeTabDetail: false
      })
      window.FB.XFBML.parse();
    }
  }

  componentDidMount() {
    window.fbAsyncInit = (() => {
      window.FB.init({
        appId: config.facebook.appId,
        cookie: true,
        xfbml: true,
        version: config.facebook.version
      });
    }).bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className="detail-info tabs-wrap tabs-wrap-secondary">
          <ul className="tabs">
            <li onClick={ this.tabs.bind(this, true) } data-tab="tabs-content-1" className={ `tabs_btn col-xs-4 ${this.state.activeTabDetail ? 'active':''}` }>Chi tiết sản phẩm</li>
            <li onClick={ this.tabs.bind(this, false) } data-tab="tabs-content-2" className={ `tabs_btn col-xs-4 ${this.state.activeTabDetail ? '':'active'}` }>Bình luận</li>
          </ul>
          <div className="tabs-content">
            <div id="tabs-content-1" className={ `tabs-content_wrap ${this.state.activeTabDetail ? 'active':''}` }>
              <div dangerouslySetInnerHTML={ this.createMarkup() } />
            </div>
            <div id="tabs-content-2" className={ `tabs-content_wrap ${this.state.activeTabDetail ? '':'active'}` }>
              <div className="fb-comments" data-href={ this.state.urlCommentFace } data-width={ config.facebook.comment.width } data-numposts={ config.facebook.comment.numberPost }></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Detail;
