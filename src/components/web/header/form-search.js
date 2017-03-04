/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T10:01:09+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-27T14:33:36+07:00
*/

import React, {Component} from 'react';
import {helpers} from 'react-base';

import ListCategorySearch from './list-category-search';

class FormSearch extends Component {

  constructor(props) {
    super(props);
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

  render() {

    return (
      <form action="" className="header_search">
        <span className="header_search_btn-categories no-select" onClick={this.showCategorySearch.bind(this)}>
          <span>Tất Cả</span>
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
          <ListCategorySearch stateCategorySearch={this.props.stateCategorySearch} dataCategoryGroup={this.props.dataCategoryGroup}/>
        </span>
        <input type="text" className="header_search_input" placeholder="search something"/>
        <button className="header_search_btn-submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    );

  }

}

export default FormSearch;
