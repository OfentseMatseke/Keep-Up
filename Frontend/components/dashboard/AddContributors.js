import React from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-08-18T21:11:54")
  );
  const [values, setValues] = React.useState({
    amount: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Add contributor
      </Button>
      <Dialog
        open={open}
        onClose={handleClick}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add contributor
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            label="Title"
            style={{ margin: 8 }}
            placeholder="Enter name!"
            // helperText="Enter event title!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl style={{ margin: 8 }} fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Amount Spent
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={values.amount}
              onChange={handleChange("amount")}
              startAdornment={
                <InputAdornment position="start">R</InputAdornment>
              }
            />
          </FormControl>
          <TextField
            label="Description"
            style={{ margin: 8 }}
            placeholder="Enter event description!"
            // helperText="Enter event title!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              style={{ margin: 8 }}
              id="date-picker-inline"
              label="Pick a Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
