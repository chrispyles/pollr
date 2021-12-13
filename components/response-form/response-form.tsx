import Link from 'next/link';

import React from 'react';

import Path, { makeHref } from '../../lib/path';

import Modal from '../modal';

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
    this.onCloseSuccessModal = this.onCloseSuccessModal.bind(this);
    this.renderSuccessModal = this.renderSuccessModal.bind(this);

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

  onCloseSuccessModal() {
    this.setState({ responseId: null, selectedIndex: null });
  }

  renderSuccessModal() {
    const { questionId } = this.props;
    const { responseId } = this.state;
    if (responseId === null) {
      return;
    }

    return (
      <Modal onClose={this.onCloseSuccessModal}>
        <h2>Your response has been recorded.</h2>
        <p>You can see it{' '}
          <Link href={makeHref(Path.RESPONSE, { questionId, responseId })}>
            <a>here</a>
          </Link> or view the other responses{' '}
          <Link href={makeHref(Path.ALL_RESPONSES, { questionId })}>
            <a>here</a>
          </Link>.
        </p>
      </Modal>
    );
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
        {this.renderSuccessModal()}
      </div>
    );
  }
}
