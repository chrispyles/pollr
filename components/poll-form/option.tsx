import cn from 'classnames';

import { ChangeEventHandler, ReactElement } from 'react';

import { Draggable, resetServerContext } from 'react-beautiful-dnd';

import { MAX_CHARS } from '../../constants/creation-form';

import ClearIcon from '../icons/clear';
import DragIcon from '../icons/drag';

import utilStyles from '../../styles/utils.module.scss';

import styles from './option.module.scss';


type OptionProps = {
  text: string;
  onChange: ChangeEventHandler;
  onDelete: () => void;
  index: number;
};


export default function Option(props: OptionProps): ReactElement {
  const { text, onChange, onDelete, index } = props;
  return (
    <Draggable draggableId={`option-${index}`} index={index}>
      {(provided) => (
        <li className={styles.option} ref={provided.innerRef} {...provided.draggableProps}>
          <div className={styles.inputRow}>
            <input 
              type="text"
              placeholder="Option text"
              name="options"
              value={text} 
              onChange={onChange}
            />
            <span 
              className={cn(styles.icon, styles.dragIcon)}
              {...provided.dragHandleProps}
              tabIndex={-1}
            >
              <DragIcon />
            </span>
            <span 
              className={cn(styles.icon, styles.clearIcon)}
              onClick={onDelete}
            ><ClearIcon /></span>
          </div>
          <p className={utilStyles.alignRight}>({text.length} / {MAX_CHARS} characters)</p>
        </li>
      )}
    </Draggable>
  )
}


resetServerContext();
