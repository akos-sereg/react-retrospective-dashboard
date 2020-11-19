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

    if (this.props.size) {
      classNames.push(`btn-${this.props.size}`);
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
        test-id={this.props.testId}
        automation-id={this.props.automationId}
        type="submit"
        value={this.props.label}
        className={classNames.join(' ')}
        disabled={this.props.isDisabled}
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
  testId: PropTypes.string,
  automationId: PropTypes.string,
  isDisabled: PropTypes.bool,
  size: PropTypes.string
};

export default Button;
