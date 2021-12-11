import { ChangeEventHandler, ReactElement } from 'react';

import { MAX_CHARS } from '../../constants/creation-form';

import utilStyles from '../../styles/utils.module.scss';

import styles from './option.module.scss';


type OptionProps = {
  text: string;
  onChange: ChangeEventHandler;
};


export default function Option({ text, onChange }: OptionProps): ReactElement {
  return (
    <li className={styles.option}>
      <input 
        type="text"
        placeholder="Option text"
        name="options"
        value={text} 
        onChange={onChange}
      />
      <p className={utilStyles.alignRight}>({text.length} / {MAX_CHARS} characters)</p>
    </li>
  )
}
