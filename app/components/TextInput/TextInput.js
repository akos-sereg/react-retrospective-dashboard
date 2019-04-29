import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class TextInput extends React.Component {
  render() {
    let wrapperClass = 'form-group wrapper';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' has-error';
    }

    return (
      <div className={wrapperClass} style={{ width: this.props.width != null ? this.props.width : '100%' }}>
        {/* eslint-disable jsx-a11y/label-has-for */}
        {
          this.props.label ?
            <label className="input-label" htmlFor={this.props.name}>{this.props.label}</label>
            : null
        }
        <div className="field">
          <input
            type="text"
            name={this.props.name}
            className="form-control"
            autoComplete="off"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  error: PropTypes.string
};
