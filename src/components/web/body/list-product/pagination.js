/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-04T09:08:01+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-04T16:53:02+07:00
 */

import React, {Component} from 'react';
import config from '../../../../config/index';
import {helpers} from 'react-base';
import loadStatus from '../../../../const/load-status';

class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: null,
      pageSize: null,
      totalPages: null,
      showPagination: null,
      leftButton: true,
      rightButton: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.dataPaginate).length > 0) {
      this.setState({showPagination: true, totalPages: nextProps.dataPaginate.totalPages, pageNumber: nextProps.dataPaginate.pageNumber});
      let pageNumber = nextProps.dataPaginate.pageNumber,
        totalPages = nextProps.dataPaginate.totalPages;

      if (pageNumber === 1) {
        this.setState({leftButton: false});
      } else if (pageNumber > 1) {
        this.setState({leftButton: true});
      }

      if (totalPages === 1) {
        this.setState({showPagination: false});
      }

      if (pageNumber === totalPages) {
        this.setState({rightButton: false});
      } else if (pageNumber < totalPages) {
        this.setState({rightButton: true});
      }
    }
  }

  handlePagination(i) {
    this.handleGetApiProduct(i);
  }

  handleGetApiProduct(i) {
    let dataLoadProductOfPagination = (dataAssign) => {
      return helpers.Data.assign(this.props.dataPaginate, dataAssign);
    };
    this.props.actions.statusLoadProductByPagination(dataLoadProductOfPagination({loadingProduct: loadStatus.loading}))
    this.props.actions.getProductByUrlKeyCategoryGroup(this.props.params.urlKeyCategoryGroup, i, null, {loadingProduct: loadStatus.assignDataLoad});

  }

  handlePaginationLeft(left) {
    let page = null;
    if (left) {
      page = this.state.pageNumber - 1;
      this.handleGetApiProduct(page);
      return true;
    }
    page = this.state.pageNumber + 1;
    this.handleGetApiProduct(page);
    return true;
  }

  render() {
    if (this.state.showPagination) {
      let listItemPagination = [],
        maxLengthPagination = config.default.maxLengthPagination,
        totalPages = this.state.totalPages,
        pageNumber = this.state.pageNumber,
        lengthPages = 0,
        initPosition = 1;
      if (maxLengthPagination < totalPages) {
        if (pageNumber < maxLengthPagination) {
          lengthPages = maxLengthPagination;
        } else {
          if (pageNumber < totalPages) {
            initPosition = pageNumber;
            lengthPages = pageNumber + maxLengthPagination - 1;
          } else {
            initPosition = pageNumber - 1;
            lengthPages = totalPages;
          }
        }
      } else if (maxLengthPagination === totalPages) {
        lengthPages = totalPages;
      } else if (maxLengthPagination > totalPages) {
        lengthPages = totalPages;
      }

      for (let i = initPosition; i <= lengthPages; i++) {
        let classActive = '';
        if (this.state.pageNumber === i) {
          classActive = 'active';
        }
        listItemPagination.push(
          <li key={i} onClick={this.handlePagination.bind(this, i)}>
            <a className={`menu ${classActive}`}>{i}</a>
          </li>
        )
      }

      return (
        <div className="pagging-wrap clear-fix">
          <ul className="menus">
            <li onClick={this.handlePaginationLeft.bind(this, true)} style={{
              display: this.state.leftButton
                ? ''
                : 'none'
            }}>
              <a className="menu">
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </a>
            </li>
            {listItemPagination}
            <li onClick={this.handlePaginationLeft.bind(this, false)} style={{
              display: this.state.rightButton
                ? ''
                : 'none'
            }}>
              <a className="menu">
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      )
    }
    return (
      <div></div>
    )
  }

}

export default Pagination;
