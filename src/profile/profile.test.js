import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../components/Profile'; // Điều chỉnh đường dẫn import cho đúng với cấu trúc dự án của bạn
import instance from '../configApi/axiosConfig';

// Giả lập module axios instance
jest.mock('../configApi/axiosConfig', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe('Profile Component Integration Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('fetches and displays user data correctly on component mount', async () => {
    const userData = {
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      dob: "1990-01-01",
      imageUser: 'path/to/image.jpg'
    };

    instance.get.mockResolvedValue({
      data: { data: [userData] }
    });

    render(<Profile />);

    // Wait for the API response to be handled and check for displayed data
    await waitFor(() => {
      expect(screen.getByDisplayValue(userData.fullName)).toBeInTheDocument();
      expect(screen.getByDisplayValue(userData.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(userData.phoneNumber)).toBeInTheDocument();
    });
  });

  it('submits updated data and shows success message', async () => {
    const updatedFullName = "Jane Doe";

    // Setup the component with initial data
    instance.get.mockResolvedValue({
      data: { data: [{
        fullName: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        dob: "1990-01-01",
        imageUser: 'path/to/image.jpg'
      }] }
    });

    render(<Profile />);
    await waitFor(() => {
      userEvent.clear(screen.getByLabelText('Họ và tên'));
      userEvent.type(screen.getByLabelText('Họ và tên'), updatedFullName);
    });

    // Mock the post request for updating the profile
    instance.post.mockResolvedValue({ data: { filename: 'new_path/to/image.jpg' } });

    userEvent.click(screen.getByText('Xác nhận'));

    // Check if post was called correctly
    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledWith('/update_profile', expect.anything());
      expect(screen.getByText('Cập nhật thông tin thành công')).toBeInTheDocument();
    });
  });

  // Further tests can be added here
});
