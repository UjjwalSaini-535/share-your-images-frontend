import React from "react";
import { useHistory } from "react-router-dom";

import Modal from "./Modal";
import Button from "../FormElements/Button";

const ErrorModal = (props) => {
  const history = useHistory();

  const clearErrorAndMoveToHome = () => {
    props.onClear();
    if (props.url) {
      history.push(props.url);
    }
  };

  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={clearErrorAndMoveToHome}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
