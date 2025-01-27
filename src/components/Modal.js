import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Modal = ({ open, close, content }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Preview Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img src={content} alt="quote image" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <button
            type="button"
            onClick={close}
            autoFocus
            className="btn btn-small mt-2"
          >
            Ok
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
