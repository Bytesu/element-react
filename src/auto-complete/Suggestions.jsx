/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { Component,ParentContext, PropTypes, Transition, View } from '../../libs';
// import {ParentContext} from ''

import { Scrollbar } from '../scrollbar';

type Props = {
  suggestions: Array<any>,
}

type State = {
  showPopper: boolean,
  dropdownWidth: string,
}

export default class Suggestions extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
  }

  onVisibleChange(visible: boolean, inputWidth: string): void {
    this.setState({
      dropdownWidth: inputWidth,
      showPopper: visible
    });
  }

  // parent(): Component {
  //   return this.context.component;
  // }

  onSelect(item: Object): void {
    this.context.parent.select(item);
  }

  onEnter(): void {
    const reference = this.context.parent.inputNode.current.domRef.current;//ReactDOM.findDOMNode(this.context.parent.inputNode);

    this.popperJS = new Popper(reference, this.domRef.current, {
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
  }

  onAfterLeave(): void {
    this.popperJS.destroy();
  }

  render(): React.DOM {
    const { customItem } = this.context.parent.props;
    const { loading, highlightedIndex } = this.context.parent.state;
    const { suggestions } = this.props;
    const { showPopper, dropdownWidth } = this.state;

    return (
      <Transition name="el-zoom-in-top"
                  onEnter={this.onEnter.bind(this)}
                  onAfterLeave={this.onAfterLeave.bind(this)}
        domRef={this.domRef}
      >
        <View
          show={showPopper}

        >
          <div
            ref={this.domRef}
            // ref="popper"
            className={this.classNames('el-autocomplete-suggestion', 'el-popper', {
              'is-loading': loading
            })}
            style={{
              width: dropdownWidth,
              zIndex: 1
            }}
          >
            <Scrollbar
              viewComponent="ul"
              wrapClass="el-autocomplete-suggestion__wrap"
              viewClass="el-autocomplete-suggestion__list"
            >
              {
                loading ? (
                  <li><i className="el-icon-loading"></i></li>
                ) : suggestions.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={this.classNames({'highlighted': highlightedIndex === index})}
                      onClick={this.onSelect.bind(this, item)}>
                      {
                        !customItem ? item.value : React.createElement(customItem, {
                          index,
                          item
                        })
                      }
                    </li>
                  )
                })
              }
            </Scrollbar>
          </div>
        </View>
      </Transition>
    )
  }
}

Suggestions.contextType = ParentContext;
