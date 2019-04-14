import React from 'react';

import styles from './imagePreview.module.css';

const ImagePreview = ({file, onDelete}) => (
  <div className={styles.root}>
    <img src={URL.createObjectURL(file)} alt="Test" /> 
    <button onClick={onDelete} className={styles.deleteIcon}>X</button> 
  </div>
)

export default ImagePreview;