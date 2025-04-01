import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { fetchAPI, submitAPI } from '../../../utils/fakeAPI';
import pages from '../../../utils/pages';
import BookingForm from './BookingForm';

const updateTimes = (availableTimes, date) => {
  const newTimes = fetchAPI(new Date(date));
  return newTimes.length ? newTimes : availableTimes;
};

const initializeTimes = initialAvailableTimes => [
  ...initialAvailableTimes,
  ...fetchAPI(new Date()),
];

const Bookings = () => {
  const [availableTimes, dispatchOnDateChange] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  const submitData = formData => {
    if (submitAPI(formData)) {
      navigate(pages.get('confirmedBooking').path);
    }
  };

  return (
    <div className="bookings">
      <h2>Table reservation</h2>
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    </div>
  );
};

export default Bookings;
