import autosize from 'autosize';

import { ChangeEventHandler, Component, createRef, ReactElement, Ref } from 'react';

import { MAX_CHARS } from '../../constants/creation-form';

import utilStyles from '../../styles/utils.module.scss';

import styles from './question.module.scss';


type QuestionProps = {
  text: string;
  onChange: ChangeEventHandler;
};


export default class Question extends Component<QuestionProps> {
  textarea = null;

  constructor(props) {
    super(props);

    this.textarea = createRef();
  }

  componentDidMount(): void {
    this.textarea.current.focus();
    autosize(this.textarea.current);
    this.textarea.current.blur();
  }

  render() {
    const { text, onChange } = this.props;
    return (
      <div className={styles.question}>
        <textarea 
          ref={this.textarea}
          name="questionText" 
          id="questionText" 
          onChange={onChange} 
          value={text}
          placeholder="Your question"
        />
        <p className={utilStyles.alignRight}>({text.length} / {MAX_CHARS} characters)</p>
      </div>
    );
  }
}
