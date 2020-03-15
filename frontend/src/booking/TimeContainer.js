import React, { useState } from "react";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { addBooking } from "../store/booking/bookingActions";

const timeMessages = messages.time;

const TimeContainer = (props) => {
  const history = useHistory();
  // Update this in the future to get time as well
  const { oldSeats, oldDate } = props;

  const [seats, changeSeats] = useState((oldSeats == null) ? "" : oldSeats);
  const [selectedDate, setSelectedDate] = useState((oldDate == null) ? new Date() : oldDate);

  const handleTimeConfirmation = () => {
    changePath("/details", history);
    props.onConfirmClick(selectedDate, seats, null);
  };

  /**
   * Upon clicking, we want to update the store with inputted values
   */
  return (
    <div className={style.bookingDetailsContainer}>
      <h1>{timeMessages.placeholder}</h1>
      <div className={style.bookingDetailsContainer}>
        <div className={style.bookingDetail}>
          <TextField
            type="number"
            label="Number of Guests"
            variant="outlined"
            onChange={(e) => changeSeats(e.target.value)}
          />
        </div>
        <div className={style.bookingDetail}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              label="Select a Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={style.contentContainer}>
          {/* Time fields go here */}
          <div className={style.inputContainer}>
            <TextField
              type="number"
              value={0}
            />
          </div>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <button onClick={handleTimeConfirmation}>{timeMessages.buttonNextText}</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  oldSeats: state.bookingReducer.seats,
  oldDate: state.bookingReducer.date,
  oldTime: state.bookingReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  onConfirmClick: (date, seats, time) => { dispatch(addBooking(date, seats, time, "", null)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeContainer);