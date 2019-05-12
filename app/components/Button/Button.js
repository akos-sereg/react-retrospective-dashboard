import React from 'react';
import PropTypes from 'prop-types';
import 'toastr/build/toastr.min.css';
import './style.scss';

class Button extends React.Component {
  render() {
    const buttonType = this.props.buttonType ? this.props.buttonType : 'default';
    const classNames = ['btn', `btn-${buttonType}`];
    if (this.props.float) {
      classNames.push(this.props.float === 'left' ? 'button-wrapper-left' : 'button-wrapper-right');
    } else {
      classNames.push('button-wrapper-left');
    }

    const styles = {};
    if (this.props.marginTop) {
      styles.marginTop = `${this.props.marginTop}px`;
    }

    if (this.props.marginLeft) {
      styles.marginLeft = `${this.props.marginLeft}px`;
    }

    return (
      <input
        style={styles}
        type="submit"
        value={this.props.label}
        className={classNames.join(' ')}
        onClick={(event) => this.props.onClick(event)}
      />
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonType: PropTypes.string,
  marginTop: PropTypes.string,
  float: PropTypes.string,
  marginLeft: PropTypes.string,
};

export default Button;
