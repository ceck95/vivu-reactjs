/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-03-07T15:29:58+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   root
* @Last modified time: 2017-03-07T21:24:07+07:00
*/

import React, {Component} from 'react';
import {Link} from 'react-router';

class BreadCrumb extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataBreadCrumb: []
    }
  }

  componentWillMount() {
    if (this.props.dataBreadCrumb.length > 0) {
      this.setState({dataBreadCrumb: this.props.dataBreadCrumb});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataBreadCrumb.length > 0) {
      this.setState({dataBreadCrumb: nextProps.dataBreadCrumb});
    }
  }

  render() {
    let listElement = [];
    if (this.state.dataBreadCrumb.length > 0) {
      this.state.dataBreadCrumb.forEach((e, i) => {
        if (e.currentLink) {
          listElement.push(
            <span key={i}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
              <span>{e.name}</span>
            </span>
          );
        } else {
          listElement.push(
            <span key={i}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
              <span>
                <Link to={`/${e.urlKey}`}>{e.name}</Link>
              </span>
            </span>
          );
        }
      });
    }
    return (
      <div className="title-link">
        <Link to="/">Trang chủ</Link>
        {listElement}
      </div>
    )
  }

}

export default BreadCrumb;
