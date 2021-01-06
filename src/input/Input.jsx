/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

import calcTextareaHeight from './calcTextareaHeight'

type State = {
  textareaStyle: { resize: string, height?: string }
}

export default class Input extends Component {
  state: State;

  static defaultProps = {
    type: 'text',
    autosize: false,
    rows: 2,
    trim: false,
    autoComplete: 'off'
  }

  constructor(props: Object) {
    super(props);
    this.inputRef = React.createRef();
    this.textareaRef = React.createRef();

    this.state = {
      textareaStyle: { resize: props.resize }
    };
  }

  componentDidMount() {
    this.resizeTextarea();
  }

  /* <Instance Methods */

  focus(): void {
    setTimeout(() => {
      (this.inputRef.current || this.textareaRef.current).focus();
    });
  }

  blur(): void {
    setTimeout(() => {
      (this.inputRef.current || this.textareaRef.current).blur();
    });
  }

  /* Instance Methods> */

  fixControlledValue(value: mixed): mixed {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }

  handleChange(e: SyntheticInputEvent<any>): void {
    const { onChange } = this.props;

    if (onChange) {
      onChange(e.target.value);
    }
    this.resizeTextarea();
  }

  handleFocus(e: SyntheticEvent<any>): void {
    const { onFocus } = this.props;
    if (onFocus) onFocus(e)
  }

  handleBlur(e: SyntheticEvent<any>): void {
    const { onBlur } = this.props
    if (this.props.trim) this.handleTrim()
    if (onBlur) onBlur(e)
  }

  handleTrim(): void {
    this.inputRef.current.value = this.inputRef.current.value.trim()
    if(this.props.onChange) {
      // this's for controlled components
      this.props.onChange(this.inputRef.current.value.trim())
    }
  }

  handleIconClick(e: SyntheticEvent<any>): void {
    if (this.props.onIconClick) {
      this.props.onIconClick(e)
    }
  }

  resizeTextarea(): void {
    const { autosize, type } = this.props;

    if (!autosize || type !== 'textarea') {
      return;
    }

    const minRows = autosize.minRows;
    const maxRows = autosize.maxRows;
    const textareaCalcStyle = calcTextareaHeight(this.textareaRef.current, minRows, maxRows);

    this.setState({
      textareaStyle: Object.assign({}, this.state.textareaStyle, textareaCalcStyle)
    });
  }

  render(): React.DOM {
    const { type, size, prepend, append, icon, autoComplete, validating, rows, onMouseEnter, onMouseLeave, trim,
      ...otherProps
    } = this.props;

    const classname = this.classNames(
      type === 'textarea' ? 'el-textarea' : 'el-input',
      size && `el-input--${size}`, {
        'is-disabled': this.props.disabled,
        'el-input-group': prepend || append,
        'el-input-group--append': !!append,
        'el-input-group--prepend': !!prepend
      }
    );

    if ('value' in this.props) {
      otherProps.value = this.fixControlledValue(this.props.value);

      delete otherProps.defaultValue;
    }

    delete otherProps.resize;
    delete otherProps.style;
    delete otherProps.autosize;
    delete otherProps.onIconClick;

    if (type === 'textarea') {
      this.domRef =this.textareaRef;
      return (
        <div style={this.style()} className={this.className(classname)}>
          <textarea { ...otherProps }
            ref={this.textareaRef}
            className="el-textarea__inner"
            style={this.state.textareaStyle}
            rows={rows}
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          ></textarea>
        </div>
      )
    } else {
      this.domRef =this.inputRef;
      return (
        <div style={this.style()} className={this.className(classname)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          { prepend && <div className="el-input-group__prepend">{prepend}</div> }
          { typeof icon === 'string' ? <i className={`el-input__icon el-icon-${icon}`} onClick={this.handleIconClick.bind(this)}>{prepend}</i> : icon }
          <input { ...otherProps }
            ref={this.inputRef}
            type={type}
            className="el-input__inner"
            autoComplete={autoComplete}
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
          { validating && <i className="el-input__icon el-icon-loading"></i> }
          { append && <div className="el-input-group__append">{append}</div> }
        </div>
      )
    }
  }
}

Input.propTypes = {
  // base
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  trim: PropTypes.bool,

  // type !== 'textarea'
  size: PropTypes.oneOf(['large', 'small', 'mini']),
  prepend: PropTypes.node,
  append: PropTypes.node,

  // type === 'textarea'
  autosize: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
  rows: PropTypes.number,
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),

  // event
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onIconClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,

  // autoComplete
  autoComplete: PropTypes.string,
  inputSelect: PropTypes.func,

  // form related
  form: PropTypes.string,
  validating: PropTypes.bool,
}
