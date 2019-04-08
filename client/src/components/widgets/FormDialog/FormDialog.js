import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './formDialog.module.css';

const FormDialog = ({ open, onClose, children, onSubmitForm, isLoading }) => {
  return (
    <div className={styles.root}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='form-dialog-title'
        className={styles.dialog}
        scroll={'body'}
      >
        <DialogTitle id='form-dialog-title' className={styles.title}>
          Yeni Kategoriya əlavə et
        </DialogTitle>
        <DialogContent className={styles.content}>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onSubmitForm} variant='contained' color='primary'>
            {isLoading ? <CircularProgress /> : 'Yadda saxla'}
          </Button>
          <Button onClick={onClose} color='primary'>
            Bagla
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
