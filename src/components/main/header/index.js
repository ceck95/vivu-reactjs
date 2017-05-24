/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2016-10-17T11:34:52+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-25T10:04:58+07:00
 */

import React, { Component } from 'react';
import { Col, FormGroup, InputGroup, DropdownButton, MenuItem, FormControl, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../actions/index';
import ReactBase from 'react-base';
import config from '../../../config';
import { helpers } from 'react-base';

import FormLogin from './form-login';
import Cart from './cart';
import FormSearch from './form-search';
import ListCategoryProduct from './list-category-product';
import Notify from '../body/common/notify';

//const
import loadStatus from '../../../const/load-status';

const sizeMobile = 1025;
const sizeWidthWindow = window.innerWidth;

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerDisplay: '',
      dataNotify: {},
      listNotify: [],
      keyNotify: 0
    }
  }

  showCategory() {
    let data = {
      showMenu: true
    };
    if (this.props.menuCategory.showMenu) {
      data = {
        showMenu: false
      };
    }
    this.props.actions.setShowMenuCategory(helpers.Data.assign(this.props.menuCategory, data));
  }

  componentWillMount() {
    // this.props.actions.getQuote();
  }

  componentDidMount() {
    let data = {};
    if (this.props.routing.locationBeforeTransitions.pathname !== '/') {
      data = {
        showMenu: true
      };
      if (sizeWidthWindow < sizeMobile) {
        data = {
          showMenu: false
        };
      }
    } else {
      data = {
        showMenu: false
      };
    }

    this.props.actions.setShowMenuCategory(helpers.Data.assign(this.props.menuCategory, data));
    window.addEventListener('scroll', this.scrollSlide.bind(this));
    window.document.getElementById(config.app.elementId).addEventListener('click', this.handleDocumentClick.bind(this))
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollSlide.bind(this));
    window.document.getElementById(config.app.elementId).removeEventListener('click', this.handleDocumentClick.bind(this))
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    sizeWidthWindow = window.innerWidth;
  }

  handleDocumentClick(e) {
    let area = this.refs.menuCategory;

    if (!area.contains(e.target)) {
      let showMenu = true;
      if (sizeWidthWindow < sizeMobile) {
        showMenu = false
      }

      this.props.actions.setShowMenuCategory(helpers.Data.assign(this.props.menuCategory, {
        showMenu: showMenu
      }));
    }
  }

  scrollSlide(e) {
    let sizeScroll = e.srcElement.body.scrollTop,
      dataAssign = {};

    if (sizeWidthWindow < sizeMobile) {
      if (sizeScroll > 0) {
        dataAssign = {
          showMenu: false
        };
      } else if (sizeScroll === 0) {
        dataAssign = {
          showMenu: false
        };
      }
    } else {
      if (sizeScroll > 0) {
        dataAssign = {
          showMenu: true,
          headerTopHide: true
        };
      } else if (sizeScroll === 0) {
        dataAssign = {
          showMenu: false,
          headerTopHide: false
        };
      }
    }
    let pathName = this.props.routing.locationBeforeTransitions.pathname;
    if (pathName !== '/') {
      dataAssign.showMenu = true;
      if (sizeWidthWindow < sizeMobile) {
        dataAssign.showMenu = false;
      }
    }
    if (sizeWidthWindow >= sizeMobile || sizeScroll === 0 || sizeWidthWindow < sizeMobile && this.props.menuCategory.showMenu) {
      this.props.actions.setShowMenuCategory(helpers.Data.assign(this.props.menuCategory, dataAssign));
    }
  }

  componentWillReceiveProps(nextProps) {
    let headerDisplay = nextProps.menuCategory.headerTopHide;
    let pathName = nextProps.routing.locationBeforeTransitions.pathname,
      lastPathName = this.props.routing.locationBeforeTransitions.pathname,
      routeInfo = nextProps.routing.locationBeforeTransitions;

    if (routeInfo.pathname === '/' && routeInfo.search === `?${config.login.redirectQueryParamName}=%2Fcheckout`) {
      if (!nextProps.statePopup.login) {
        this.props.actions.setStatePopupLogin(helpers.Data.assign(nextProps.statePopup, {
          login: true
        }));
        this.props.actions.redirectHome();
      }
    }

    if (Object.keys(nextProps.dataNotify).length > 0 && nextProps.dataNotify.show) {
      let listNotify = this.state.listNotify,
        key = 0;
      if (this.state.keyNotify === 0) {
        key = this.state.keyNotify;
      }
      key = this.state.keyNotify + 1;
      listNotify.push(<Notify key={ key } actions={ this.props.actions } dataNotify={ nextProps.dataNotify } />);
      this.setState({
        listNotify: listNotify,
        keyNotify: key
      });
    }

    if (pathName !== lastPathName) {
      let data = {};
      if (pathName !== '/') {
        data = {
          showMenu: true
        };
        if (sizeWidthWindow < sizeMobile) {
          data = {
            showMenu: false
          };
        }
      } else {
        data = {
          showMenu: false
        };
      }
      this.props.actions.setShowMenuCategory(helpers.Data.assign(this.props.menuCategory, data));
    }

    if (nextProps.dataQuote.loadDataCartStatus === loadStatus.startLoad) {
      this.props.actions.updateDataQuote(helpers.Data.assign(nextProps.dataQuote, {
        loadDataCartStatus: loadStatus.loading
      }));
      this.props.actions.getQuoteItemByQuote(nextProps.dataQuote.quote.id, nextProps.dataQuote);
    }

    if (this.props.routing.locationBeforeTransitions.pathname !== nextProps.routing.locationBeforeTransitions.pathname) {
      window.scrollTo(0, 0);
    }

    if (headerDisplay) {
      this.setState({
        headerDisplay: 'header_top_hide'
      })
      return true;
    }
    this.setState({
      headerDisplay: ''
    });
    return true;
  }


  render() {

    const appName = this.props.dataSetting.setting.appName;

    return (
      <header className="header">
        <div className={ `header_top ${this.state.headerDisplay}` }>
          <div className="header_top_left container">
            <a href="#">tranvannhut4495@gmail.com</a>
          </div>
        </div>
        <div className="container">
          <div className="row header_content">
            <div className="col-xs-3 col-sm-2 brand no-select">
              <Link to="/" className="brand_logo">
              { appName }
              </Link>
            </div>
            <div className="col-sm-6 header_search_wrap">
              <FormSearch stateCategorySearch={ this.props.searchMenuCategory } dataCategoryGroup={ this.props.categoryGroup } actions={ this.props.actions } />
            </div>
            <div className="col-xs-9 col-sm-6 col-md-4 header_content_right">
              <FormLogin actions={ this.props.actions } statePopup={ this.props.statePopup } dataLogin={ this.props.dataLogin } dataAddress={ this.props.dataAddress } />
              <Cart actions={ this.props.actions } dataQuote={ this.props.dataQuote } dataQuoteCart={ this.props.dataQuoteCart } />
            </div>
          </div>
        </div>
        <div className="nav container" ref="menuCategory">
          <button id="collapse-nav-btn" onClick={ this.showCategory.bind(this) }>
            <i className="fa fa-bars" aria-hidden="true"></i>Danh mục
          </button>
          <ListCategoryProduct dataCategoryGroup={ this.props.categoryGroup } stateCategory={ this.props.menuCategory } />
        </div>
        { this.state.listNotify.length > 0
          ? this.state.listNotify
          : '' }
      </header>
    )
  }
}

Header.propTypes = {
  actions: React.PropTypes.object,
  menuCategory: React.PropTypes.object,
  routing: React.PropTypes.object,
  searchMenuCategory: React.PropTypes.object,
  categoryGroup: React.PropTypes.array,
  statePopup: React.PropTypes.object,
  dataLogin: React.PropTypes.object,
  dataAddress: React.PropTypes.object,
  dataQuoteCart: React.PropTypes.array,
  dataQuote: React.PropTypes.object
}

let mapRedux = new ReactBase.helpers.mapRedux({
  actions: actions,
  bindActionCreators: bindActionCreators
});

export default connect(mapRedux.mapStateToProps, mapRedux.mapDispatchToProps)(Header);
