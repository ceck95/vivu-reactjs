import React, { Component } from 'react';
import ErrorForm from './error-form';

class FormGender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      gender: ''
    }
  }

  setValueInt(props) {
    this.setState({
      message: props.message,
      gender: props.value
    })
  }

  componentWillMount() {
    this.setValueInt(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setValueInt(nextProps);
  }

  setGender(opt) {
    this.props.setGender(opt);
  }

  render() {

    return (
      <div className="signin_items row">
        <label className="col-xs-3" htmlFor="">Giới tính:</label>
        <div className="col-xs-9 sex-wrap require-wrap">
          <div>
            <input checked={ this.state.gender === 'male' } onChange={ this.setGender.bind(this, 'male') } type="radio" id="male" name="gender" ref="gender" />
            <label htmlFor="male">
              <span className="check"></span>Nam
            </label>
          </div>
          <div>
            <input checked={ this.state.gender === 'female' } type="radio" id="female" name="gender" onChange={ this.setGender.bind(this, 'female') } />
            <label htmlFor="female">
              <span className="check"></span>Nữ
            </label>
          </div>
          { this.state.message
            ? <ErrorForm message={ this.state.message } />
            : '' }
        </div>
      </div>
      );

  }

}

FormGender.propTypes = {
  name: React.PropTypes.string
};

export default FormGender;