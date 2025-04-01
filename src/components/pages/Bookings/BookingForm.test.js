import { fireEvent, render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  const availableTimes = ['17:00', '17:30'];
  const today = new Date().toISOString().split('T')[0];
  const dispatchOnDateChange = jest.fn();
  const submitData = jest.fn();

  const renderForm = () =>
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    );

  test('renders all form fields with default values', async () => {
    renderForm();

    const dateInput = screen.getByLabelText(/Date/);
    const timeSelect = screen.getByLabelText(/Time/);
    const timeOptions = await screen.findAllByTestId('booking-time-option');
    const guestsInput = screen.getByLabelText(/Number of guests/);
    const occasionSelect = screen.getByLabelText(/Occasion/);
    const occasionOptions = await screen.findAllByTestId('booking-occasion-option');
    const submitButton = screen.getByRole('button');

    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveValue(today);

    expect(timeSelect).toBeInTheDocument();
    expect(timeOptions).toHaveLength(2);

    expect(guestsInput).toBeInTheDocument();
    expect(guestsInput).toHaveValue(1);

    expect(occasionSelect).toBeInTheDocument();
    expect(occasionOptions).toHaveLength(2);

    expect(submitButton).toBeEnabled();
  });

  test('submits the form with default values', () => {
    renderForm();

    fireEvent.click(screen.getByRole('button'));

    expect(submitData).toHaveBeenCalledWith({
      date: today,
      time: availableTimes[0],
      numberOfGuests: 1,
      occasion: 'Birthday',
    });
  });

  test('disables submit button and shows error when date is empty', () => {
    renderForm();

    const dateInput = screen.getByLabelText(/Date/);
    fireEvent.change(dateInput, { target: { value: '' } });
    fireEvent.blur(dateInput);

    expect(screen.getByTestId('error-message')).toHaveTextContent('Please choose a valid date');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('disables submit button and shows error when number of guests is empty', () => {
    renderForm();

    const guestsInput = screen.getByLabelText(/Number of guests/);
    fireEvent.change(guestsInput, { target: { value: '' } });
    fireEvent.blur(guestsInput);

    expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a number between 1 and 10');
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
