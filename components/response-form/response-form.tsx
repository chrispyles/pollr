import React from 'react';
import Path from '../../lib/path';

import Option from './option';

import utilsStyles from '../../styles/utils.module.scss';


type ResponseFormProps = {
  questionId: number;
  questionText: string;
  options: {
    text: string,
    id: string,
  }[];
};


type ResponseFormState = {
  selectedIndex: number | null;
  responseId: number | null;
};


type CreateResponseResponse = {
  responseId: number;
};


export default class ResponseForm extends React.Component<ResponseFormProps, ResponseFormState> {
  constructor(props) {
    super(props);
    
    this.setSelection = this.setSelection.bind(this);
    this.submitResponse = this.submitResponse.bind(this);

    this.state = {
      selectedIndex: null,
      responseId: null,
    };
  }

  setSelection(idx: number) {
    this.setState({ selectedIndex: idx });
  }

  submitResponse() {
    const optionIds = [this.props.options[this.state.selectedIndex].id];
    const body = {
      questionId: this.props.questionId,
      optionIds,
    };
    fetch(Path.CREATE_RESPONSE, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
        },
        method: 'POST',
    }).then(async (res) => {
      if (!res.ok) {
        alert("failed!");
      } else {
        this.setState({ responseId: (await res.json() as CreateResponseResponse).responseId });
      }
    })
  }

  render() {
    const options = this.props.options.map(({ text }, i) => (
      <Option 
        key={`option-${i}`}
        text={text} 
        onClick={() => this.setSelection(i)} 
        selected={this.state.selectedIndex === i} 
      />
    ));
    return (
      <div>
        <h1>{this.props.questionText}</h1>
        <div>
          {options}
        </div>
        <div className={utilsStyles.buttonGroupCenter}>
          <button onClick={this.submitResponse}>Submit</button>
        </div>
      </div>
    );
  }
}
