/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T10:01:09+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-27T14:33:36+07:00
*/

import React, { Component } from 'react';
import { helpers } from 'react-base';

import ListCategorySearch from './list-category-search';

const categoryGroupNameDefault = 'Tất cả';

import statusLoad from '../../../const/load-status';

class FormSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCategoryGroupName: categoryGroupNameDefault
    }
  }

  showCategorySearch() {
    let dataAssign = {
      showMenu: true
    };
    if (this.props.stateCategorySearch.showMenu) {
      dataAssign = {
        showMenu: false
      }
    }
    let data = helpers.Data.assign(this.props.stateCategorySearch, dataAssign);
    this.props.actions.setShowSearchMenuCategory(data);
  }

  componentWillReceiveProps(nextProps) {
    let categoryGroupName = nextProps.stateCategorySearch.categoryGroupCurrent.name;
    this.setState({
      currentCategoryGroupName: categoryGroupName ? categoryGroupName : categoryGroupNameDefault
    });
  }

  handleSearch() {
    let searchKey = this.refs.searchKey.value;
    if (!helpers.Data.isEmpty(searchKey)) {
      this.props.actions.search(helpers.Data.assign(this.props.stateCategorySearch.categoryGroupCurrent
        , {
          searchKey: searchKey,
          statusLoad: statusLoad.startLoad
        }));
    }
  }

  searchKey(e) {

    if (e.key === 'Enter') {
      this.handleSearch();
    } else if (typeof e.key === 'undefined') {
      this.handleSearch();
    }

  }

  render() {

    return (
      <div className="header_search">
        <span className="header_search_btn-categories no-select" onClick={ this.showCategorySearch.bind(this) }><span>{ this.state.currentCategoryGroupName }</span><i className="fa fa-chevron-down" aria-hidden="true"></i>
        <ListCategorySearch actions={ this.props.actions } stateCategorySearch={ this.props.stateCategorySearch } dataCategoryGroup={ this.props.dataCategoryGroup } />
        </span>
        <input type="text" ref="searchKey" onKeyPress={ this.searchKey.bind(this) } className="header_search_input" placeholder="Tìm kiếm gì đó ?" />
        <button className="header_search_btn-submit" onClick={ this.searchKey.bind(this) }>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      );

  }

}

export default FormSearch;
