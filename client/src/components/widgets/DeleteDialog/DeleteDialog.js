import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './deleteDialog.module.css'

const DeleteDialog = ({ openDialog, closeDialog, submitDelete }) => {
  return (
    <Dialog
        open={openDialog}
        onClose={closeDialog}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title" className={styles.title}>Xəbərdarlıq</DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            Sildikdən sonra geri qaytarmaq mümkün olmayacaq. 
            Bunu nəzərə alaraq qərar verib, "sil" və ya "imtina" butonuna click edin
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.actions}>
          <Button onClick={closeDialog} color="primary">
            İmtina
          </Button>
          <Button onClick={submitDelete} color="secondary">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteDialog;