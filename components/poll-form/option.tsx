import cn from 'classnames';

import { ChangeEventHandler, ReactElement } from 'react';

import { MAX_CHARS } from '../../constants/creation-form';

import ClearIcon from '../icons/clear';
import DragIcon from '../icons/drag';

import utilStyles from '../../styles/utils.module.scss';

import styles from './option.module.scss';


type OptionProps = {
  text: string;
  onChange: ChangeEventHandler;
};


export default function Option({ text, onChange }: OptionProps): ReactElement {
  return (
    <li className={styles.option}>
      <div className={styles.inputRow}>
        <input 
          type="text"
          placeholder="Option text"
          name="options"
          value={text} 
          onChange={onChange}
        />
        <span className={cn(styles.icon, styles.dragIcon)}><DragIcon /></span>
        <span className={cn(styles.icon, styles.clearIcon)}><ClearIcon /></span>
      </div>
      <p className={utilStyles.alignRight}>({text.length} / {MAX_CHARS} characters)</p>
    </li>
  )
}
