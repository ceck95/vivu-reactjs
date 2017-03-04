/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2017-02-18T10:31:25+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-03T10:16:47+07:00
*/

import React, {Component} from 'react';
import {Link} from 'react-router';

class ListCategoryProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeMenu: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    let activeMenu = nextProps.stateCategory.showMenu;
    if (activeMenu) {
      this.setState({activeMenu: 'active'})
      return true;
    }
    this.setState({activeMenu: ''});
    return true;
  }

  render() {

    let listItemCategoryGroup = [];
    if (this.props.dataCategoryGroup.length > 0) {
      this.props.dataCategoryGroup.forEach(e => {
        let lisItemCategory = [];
        e.categories.forEach(i => {
          lisItemCategory.push(
            <li key={i.id}>
              <Link to={`/${e.urlKey}/${i.urlKey}`}>
                {i.name}
              </Link>
            </li>
          )
        });
        listItemCategoryGroup.push(
          <li key={e.id}>
            <Link to={`/${e.urlKey}`}>
              <i className="fa fa-folder" aria-hidden="true"></i>{e.name}
            </Link>
            <ul className="menu-second">{lisItemCategory}</ul>
          </li>
        )

      });
    }

    if (listItemCategoryGroup.length === 0) {
      listItemCategoryGroup.push(
        <li key='0'>
          <a>
            <i className="fa fa-folder" aria-hidden="true"></i>Loading</a>
        </li>
      )
    }

    return (
      <ul className={`nav_menu ${this.state.activeMenu}`}>
        {listItemCategoryGroup}
      </ul>
    )

  }
}

export default ListCategoryProduct;
