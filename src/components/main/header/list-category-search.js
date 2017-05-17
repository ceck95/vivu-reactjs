/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T10:06:42+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-27T23:26:47+07:00
*/

import React, { Component } from 'react';

const strDefault = 'Tất cả';

class ListCategorySearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeMenu: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let activeMenu = nextProps.stateCategorySearch.showMenu;
    if (activeMenu) {
      this.setState({
        activeMenu: 'active'
      })
      return true;
    }
    this.setState({
      activeMenu: ''
    });
    return true;
  }

  setCategoryGroupCurrent(e) {
    if (e) {
      this.props.actions.setCategoryGroupCurrent({
        name: e.name,
        id: e.id
      });
    } else {
      this.props.actions.setCategoryGroupCurrent({
        name: strDefault,
        id: null
      });
    }
  }

  render() {

    let listItemCategoryGroup = [<li onClick={ this.setCategoryGroupCurrent.bind(this, null) } key='0'>
                                   { strDefault }
                                 </li>];

    this.props.dataCategoryGroup.forEach(e => {
      listItemCategoryGroup.push(
        <li key={ e.id } onClick={ this.setCategoryGroupCurrent.bind(this, e) }>
          { e.name }
        </li>
      )
    });
    if (listItemCategoryGroup.length === 0) {
      listItemCategoryGroup.push(
        <li key='0'>Loading</li>
      )
    }

    return (
      <ul className={ `form_menu-cate ${this.state.activeMenu}` }>
        { listItemCategoryGroup }
      </ul>
    )

  }
}

export default ListCategorySearch;
