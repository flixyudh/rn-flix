import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SnackbarProvider, Snackbar } from '@rn-flix/snackbar';

const ProviderWrapper = ({ children }) => (
  <SnackbarProvider>{children}</SnackbarProvider>
);

describe('Snackbar', () => {
  it('renders with default props', () => {
    const view = render(<Snackbar />);
    expect(screen.getByText('')).toBeTruthy();
  });

  it('renders with custom message', () => {
    const message = 'Hello World';
    const view = render(<Snackbar message={message} />);
    expect(screen.getByText(message)).toBeTruthy();
  });

  it('renders with custom label', () => {
    const label = 'Dismiss';
    const view = render(<Snackbar label={label} />);
    expect(screen.getByText(label)).toBeTruthy();
  });

  it('renders with custom duration', () => {
    const duration = 5000;
    const view = render(<Snackbar duration={duration} />);
    expect(screen.getByText('')).toBeTruthy();
  });

  it('renders with custom backgroundColor', () => {
    const backgroundColor = '#ffffff';
    const { getByText } = render(
      <Snackbar backgroundColor={backgroundColor} />
    );
    expect(screen.getByText('')).toBeTruthy();
  });

  it('renders with custom color', () => {
    const color = '#000000';
    const view = render(<Snackbar color={color} />);
    expect(screen.getByText('')).toBeTruthy();
  });

  it('renders with custom textStyle', () => {
    const textStyle = { fontSize: 24 };
    const view = render(<Snackbar textStyle={textStyle} />);
    expect(screen.getByText('')).toBeTruthy();
  });

  it('renders with custom labelStyle', () => {
    const labelStyle = { fontSize: 24 };
    const view = render(<Snackbar labelStyle={labelStyle} />);
    expect(screen.getByText('')).toBeTruthy();
  });

  it('calls onHide function when label is pressed', () => {
    const onHide = jest.fn();
    const view = render(<Snackbar label="Dismiss" onHide={onHide} />);
    const label = screen.getByText('Dismiss');
    fireEvent.press(label);
    expect(view.onHide).toHaveBeenCalledTimes(1);
  });

  it('calls runAnimation function when animation starts', () => {
    const runAnimation = jest.fn();
    const view = render(<Snackbar />);
    const animation = screen.getByText('');
    fireEvent.animationStart(animation);
    expect(view.runAnimation).toHaveBeenCalledTimes(1);
  });
});
