import { Component } from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
    this.onDeleteOption = this.onDeleteOption.bind(this);
    this.onChangeOptionText = this.onChangeOptionText.bind(this);
    this.onOptionReorder = this.onOptionReorder.bind(this);
    this.createPoll = this.createPoll.bind(this);

    this.state = {
      questionText: '',
      options: Array(4).fill(''),
      pollCreated: false,
    };
  }

  onChangeQuestionText(evt) {
    this.setState({ questionText: evt.target.value });
  }

  onAddOption(evt) {
    evt.preventDefault();
    this.setState({ options: [ ...this.state.options, '' ]});
  }

  onDeleteOption(idx) {
    const options = [...this.state.options];
    options.splice(idx, 1);
    this.setState({ options });
  }

  onChangeOptionText(idx, evt) {
    const options = [...this.state.options];
    options[idx] = evt.target.value;
    this.setState({ options });
  }

  onOptionReorder(result) {
    if (!result.destination || (result.source.droppableId === result.destination.droppableId 
        && result.source.index === result.destination.index))
    {
      return;
    }

    const options = [...this.state.options];
    const [ draggedItem ] = options.splice(result.source.index, 1);
    options.splice(result.destination.index, 0, draggedItem);

    this.setState({ options });
    };

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
        <DragDropContext onDragEnd={this.onOptionReorder}>
          <Droppable droppableId="options">
            {(provided) => (
              <ul className="options" {...provided.droppableProps} ref={provided.innerRef}>
                {options.map((o, i) => (
                  <Option
                    key={`option-${i}`}
                    text={o} 
                    onChange={(evt) => this.onChangeOptionText(i, evt)}
                    onDelete={() => this.onDeleteOption(i)}
                    index={i}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        <div className={styles.buttons}>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div className={utilStyles.alignRight}>
            <button type="button" onClick={this.onAddOption}>Add option</button>
          </div>
        </div>
      </form>
    );
  }
}
