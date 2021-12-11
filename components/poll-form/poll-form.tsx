import { Component } from 'react';

import Option from './option';
import Question from './question';

import utilStyles from '../../styles/utils.module.scss';

import styles from './poll-form.module.scss';


type PollFormState = {
  questionText: string;
  options: string[];
  pollCreated: boolean;
};


export default class PollForm extends Component<{}, PollFormState> {
  constructor(props) {
    super(props);

    this.onChangeQuestionText = this.onChangeQuestionText.bind(this);
    this.onAddOption = this.onAddOption.bind(this);
    this.onChangeOptionText = this.onChangeOptionText.bind(this);
    this.createPoll = this.createPoll.bind(this);

    this.state = {
      questionText: '',
      options: Array(4).fill(''),
      pollCreated: false,
    };
  }

  onChangeQuestionText(evt) {
    this.setState({ questionText: evt.target.value });
  };

  onAddOption(evt) {
    evt.preventDefault();
    this.setState({ options: [ ...this.state.options, '' ]});
  };

  onChangeOptionText(idx, evt) {
    const options = [...this.state.options];
    options[idx] = evt.target.value;
    this.setState({ options });
  }

  createPoll(evt) {
    console.log(evt.target);
  }

  render() {
    const { questionText, options } = this.state;
    return (
      <form onSubmit={this.createPoll} className={styles.pollForm}>
        <h3>Question</h3>
        <Question text={questionText} onChange={this.onChangeQuestionText} />

        <h3><label htmlFor="options">Options:</label></h3>
        <ul>
          {options.map((o, i) => (
            <Option
              key={`option-${i}`}
              text={o} 
              onChange={(evt) => this.onChangeOptionText(i, evt)}
            />
          ))}
        </ul>

        <p className={utilStyles.alignRight}><a onClick={this.onAddOption}>Add option</a></p>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
