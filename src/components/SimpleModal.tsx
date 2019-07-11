import React, { Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: any): any => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    maxWidth: '500px',
    height: 'auto',
    maxHeight: '300px',
    backgroundColor: '#FFCB9A',
    boxShadow: theme.shadows[5],
    padding: '4%',
    minWidth: '500px',
    minHeight: '300px',
    borderRadius: '10px',
  },
  button: {
    marginTop: '0%',
    height: 'auto',
    marginLeft: '3%',
    borderRadius: '4px',
    float: 'right',
  },
});

const SimpleModal = (props: any) => {
  const {
    classes,
    open,
    message,
    primBtnLabel,
    secBtnLabel,
    primBtnAction,
    secBtnAction,
    closeModal,
    children = null,
  } = props;

  return (
    <Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onClose={closeModal}
        open={open}>
        <div
          style={{
            textAlign: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className={classes.paper}>
          <IconButton
            aria-label="Close"
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '2%',
              right: '1%',
              fontSize: '17px',
              fontWeight: 'bold',
              color: '#F64C72',
            }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" id="modal-title">
            {message}
          </Typography>
          <div>{children}</div>
          <div>
            {secBtnLabel ? (
              <Button style={{ borderRadius: 10, background: '#45A29E' }} onClick={secBtnAction}>
                {secBtnLabel}
              </Button>
            ) : null}
            {primBtnLabel ? (
              <Button onClick={primBtnAction} style={{ borderRadius: 10, background: '#5CDB95' }}>
                {primBtnLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default withStyles(styles)(SimpleModal);
