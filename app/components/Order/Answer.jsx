import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from 'underscore.string';

import occsn from '../../libs/Occasion';

import Checkbox from './Answers/Checkbox.jsx';
import DropDown from './Answers/DropDown.jsx';
import OptionList from './Answers/OptionList.jsx';
import SpinButton from './Answers/SpinButton.jsx';
import TextArea from './Answers/TextArea.jsx';
import TextInput from './Answers/TextInput.jsx';
import Waiver from './Answers/Waiver.jsx';

export default class Answer extends PureComponent {
  static propTypes = {
    subject: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { subject } = this.props;

    let answerProps = {
      answer: subject,
      className: s.camelize(subject.question().formControl)
    };

    switch(subject.question().formControl) {
      case 'checkbox':
        return <Checkbox {...answerProps}></Checkbox>;
      case 'drop_down':
        return <DropDown {...answerProps}></DropDown>;
      case 'option_list':
        return <OptionList {...answerProps}></OptionList>;
      case 'spin_button':
        return <SpinButton {...answerProps}></SpinButton>;
      case 'text_area':
        return <TextArea {...answerProps}></TextArea>;
      case 'text_input':
        return <TextInput {...answerProps}></TextInput>;
      case 'waiver':
        return <Waiver {...answerProps}></Waiver>;
    }
  }
}
