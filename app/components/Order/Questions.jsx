import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Resource } from 'mitragyna';

import Answer from './Answer.jsx';

import occsn from '../../libs/Occasion';

export default class Questions extends PureComponent {
  static propTypes = {
    questions: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.Question))
    }).isRequired,
    subject: PropTypes.instanceOf(occsn.Order),
  };

  render() {
    let { subject, questions } = this.props;

    return <section className="questions">
      { questions.map((question) => {
          switch(question.formControl) {
            case 'text_output':
              if(question.displayAsTitle) {
                return <legend className='question text-output-title' key={question.id}>
                  {question.title}
                </legend>;
              } else {
                return <p className='question text-output' key={question.id}>
                  {question.title}
                </p>;
              }
            case 'separator':
              return <hr className='question separator' key={question.id}></hr>;
            default:
              let answer = subject.answers().target().detect((a) => a.question() == question);
              return <Resource
                className='question'
                component={Answer}
                key={question.id}
                reflection='answers'
                subject={answer}
              ></Resource>;
          }
        }).toArray()
      }
    </section>;
  }
}
