import cn from 'classnames';

import styles from './option.module.scss';


type OptionProps = {
  text: string;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
};


export default function Option({ text, onClick, selected, disabled }: OptionProps) {
  const className = cn(styles.option, { 
    [styles.selected ]: selected, 
    [styles.disabled]: disabled, 
  });
  return (
    <div className={className} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}
