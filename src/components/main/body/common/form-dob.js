import React, { Component } from 'react';

/**
 * Import config
 */
import config from '../../../../config/index';

/**
 * Import component
 */
import ErrorForm from './error-form';

class FormDob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listElementYear: [],
      listElementMonth: [],
      listElementDay: [],
      date: null,
      month: null,
      year: null,
      message: ''
    }
  }

  componentWillMount() {
    let date = new Date(),
      year = date.getFullYear(),
      minYear = year - config.default.distanceYear,
      listElementYear = [],
      listElementMonth = [],
      listElementDay = [];
    let initBirthDay = () => {
      listElementYear.push(
        <option key='0' value=''>Năm</option>
      )
    };

    initBirthDay();

    for (let i = minYear; i <= year; i++) {
      listElementYear.push(
        <option key={ i } value={ i }>
          { i }
        </option>
      )
    }

    listElementMonth = this.renderMonth(12);
    listElementDay = this.renderDay(31);

    let props = this.props,
      dataDob = props.dataDob;

    this.setState({
      listElementYear: listElementYear,
      listElementDay: listElementDay,
      listElementMonth: listElementMonth,
      message: props.message,
      date: dataDob ? dataDob.date : null,
      month: dataDob ? dataDob.month : null,
      year: dataDob ? dataDob.year : null
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message
    });
  }

  renderDay(n, year, month) {
    let listElementDay = [],
      getYear = this.state.year,
      getMonth = this.state.month,
      date = new Date(),
      yearPresent = date.getFullYear(),
      monthPresent = date.getMonth(),
      dayPresent = date.getDate();
    listElementDay.push(
      <option key='0' value=''>Ngày</option>
    );
    if ((year || getYear) == yearPresent && (month || getMonth) == monthPresent) {
      n = dayPresent;
    }
    for (let i = 1; i <= n; i++) {
      listElementDay.push(
        <option key={ i } value={ i }>
          { i }
        </option>
      )
    }

    return listElementDay;
  }

  renderMonth(n, year) {
    let listElementMonth = [],
      getYear = this.state.year,
      date = new Date(),
      yearPresent = date.getFullYear(),
      monthPresent = date.getMonth();
    listElementMonth.push(
      <option key='0' value=''>Tháng</option>
    )
    if ((year || getYear) == yearPresent) {
      n = monthPresent;
    }
    for (let i = 1; i <= n; i++) {
      listElementMonth.push(
        <option key={ i } value={ i }>
          { i }
        </option>
      )
    }

    return listElementMonth;

  }

  checkBirthDay(monthCurrent, yearCurrent) {
    let listElementDay = [];
    if (monthCurrent == 4 || monthCurrent == 6 || monthCurrent == 9 || monthCurrent == 11) {
      listElementDay = this.renderDay(30, yearCurrent);
    } else if (monthCurrent == 2) {
      if (yearCurrent % 4 == 0 && yearCurrent % 100 != 0 || yearCurrent % 400 == 0) {
        listElementDay = this.renderDay(29, yearCurrent, monthCurrent);
      } else {
        listElementDay = this.renderDay(28, yearCurrent, monthCurrent);
      }
    } else {
      listElementDay = this.renderDay(31, yearCurrent, monthCurrent);
    }

    this.setState({
      listElementDay: listElementDay
    });
  }

  setBirthDay(options, e) {

    let setValueDob = (opt) => {
      this.props.setValueDob({
        month: opt.month || this.state.month,
        year: opt.year || this.state.year,
        date: opt.date || this.state.date
      });
    };
    switch (options) {
      case 'date':
        this.setState({
          date: e.target.value
        });
        setValueDob({
          date: e.target.value
        });
        break;
      case 'month':
        let monthCurrent = e.target.value,
          yearCurrent = this.state.year;
        this.checkBirthDay(monthCurrent, yearCurrent);
        this.setState({
          month: monthCurrent
        });
        setValueDob({
          month: monthCurrent
        });
        break;
      case 'year':
        let year = e.target.value;
        this.setState({
          year: year,
          listElementMonth: this.renderMonth(12, year)
        });
        this.checkBirthDay(this.state.month, year);
        setValueDob({
          year: year
        });
        break;
      default:
        break;
    }

  }

  render() {
    let date = this.state.date,
      month = this.state.month,
      year = this.state.year;

    return (
      <div className="signin_items row">
        <label htmlFor="" className="col-xs-3">Ngày sinh</label>
        <div className="col-xs-9 require-wrap">
          <select value={ date ? date : '' } className="signin_select" name="" id="" onChange={ this.setBirthDay.bind(this, 'date') }>
            { this.state.listElementDay }
          </select>
          <select value={ month ? month : '' } onChange={ this.setBirthDay.bind(this, 'month') } className="signin_select" name="" id="">
            { this.state.listElementMonth }
          </select>
          <select value={ year ? year : '' } onChange={ this.setBirthDay.bind(this, 'year') } className="signin_select" name="" id="">
            { this.state.listElementYear }
          </select>
          { this.state.message
            ? <ErrorForm message={ this.state.message } />
            : '' }
        </div>
      </div>
      );

  }

}

FormDob.propTypes = {
  name: React.PropTypes.string
};

export default FormDob;