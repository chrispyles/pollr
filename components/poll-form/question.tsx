import { ChangeEventHandler, ReactElement } from 'react';

import { MAX_CHARS } from '../../constants/creation-form';

import utilStyles from '../../styles/utils.module.scss';

import styles from './question.module.scss';


type QuestionProps = {
  text: string;
  onChange: ChangeEventHandler;
};


export default function Question({ text, onChange }: QuestionProps): ReactElement {
  return (
    <div className={styles.question}>
      <textarea 
        name="questionText" 
        id="questionText" 
        onChange={onChange} 
        value={text} 
      />
      <p className={utilStyles.alignRight}>({text.length} / {MAX_CHARS} characters)</p>
    </div>
  )
}
