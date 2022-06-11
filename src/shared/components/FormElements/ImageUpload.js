import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import applySuitableValidators from "../../util/validators";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const validators = applySuitableValidators(props);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const filePickerRef = useRef(null);

  const { ref, onChange, ...rest } = props.register(props.id, validators);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
      return;
    }
  };

  const callBothOnChange = (e) => {
    onChange(e);
    pickedHandler(e);
  };

  const giveFileRefToBothRefs = (e) => {
    ref(e);
    filePickerRef.current = e;
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.jpeg,.png"
        {...rest}
        ref={giveFileRefToBothRefs}
        onChange={callBothOnChange}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {props.errors["image"]?.type === "required" && (
        <p style={{ color: "red" }}>{props.requiredMsg}</p>
      )}
    </div>
  );
};

export default ImageUpload;
