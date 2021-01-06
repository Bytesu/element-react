/* @flow */

import React from 'react';
import { Component,ParentContext, PropTypes, View } from '../../libs';

type State = {
  index: number,
  visible: boolean,
  hitState: boolean
};

export default class Option extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      index: -1,
      visible: true,
      hitState: false
    }
  }

  UNSAFE_componentWillMount() {
    this.context.parent.onOptionCreate(this);

    this.setState({
      index: this.context.parent.state.options.indexOf(this)
    });

    if (this.currentSelected() === true) {
      this.context.parent.addOptionToValue(this, true);
    }
  }

  UNSAFE_componentWillUnmount() {
    this.context.parent.onOptionDestroy(this);
  }


  currentSelected(): boolean {
    return this.props.selected || (this.context.parent.props.multiple ?
      this.context.parent.state.value.indexOf(this.props.value) > -1 :
      this.context.parent.state.value === this.props.value);
  }

  currentLabel(): string {
    return this.props.label || ((typeof this.props.value === 'string' || typeof this.props.value === 'number') ? this.props.value : '');
  }

  itemSelected(): boolean {
    if (Object.prototype.toString.call(this.context.parent.state.selected) === '[object Object]') {
      return this === this.context.parent.state.selected;
    } else if (Array.isArray(this.context.parent.state.selected)) {
      return this.context.parent.state.selected.map(el => el.props.value).indexOf(this.props.value) > -1;
    }

    return false;
  }

  hoverItem() {
    if (!this.props.disabled && !this.context.parent.props.disabled) {
      this.context.parent.setState({
        hoverIndex: this.context.parent.state.options.indexOf(this)
      });
    }
  }

  selectOptionClick() {
    if (this.props.disabled !== true && this.context.parent.props.disabled !== true) {
      this.context.parent.onOptionClick(this);
    }
  }

  queryChange(query: string) {
    // query 里如果有正则中的特殊字符，需要先将这些字符转义
    const parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
    const visible = new RegExp(parsedQuery, 'i').test(this.currentLabel());

    if (!visible) {
      this.context.parent.setState({
        filteredOptionsCount: this.context.parent.state.filteredOptionsCount - 1
      });
    }

    this.setState({ visible });
  }

  resetIndex() {
    this.setState({
      index: this.context.parent.state.options.indexOf(this)
    });
  }

  render() {
    const { visible, index } = this.state;

    return (
      <View show={visible}>
        <li
          style={this.style()}
          className={this.className('el-select-dropdown__item', {
            'selected': this.itemSelected(),
            'is-disabled': this.props.disabled || this.context.parent.props.disabled,
            'hover': this.context.parent.state.hoverIndex === index
          })}
          onMouseEnter={this.hoverItem.bind(this)}
          onClick={this.selectOptionClick.bind(this)}
        >
          { this.props.children || <span>{this.currentLabel()}</span> }
        </li>
      </View>
    )
  }
}

Option.contextType = ParentContext;

Option.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  disabled: PropTypes.bool
}
