// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Messages from './Messages.jsx';

// // mock child components
// jest.mock('../../components/CurrentUser/CurrentUser.jsx', () => () => <div>CurrentUser</div>);
// jest.mock('../../components/Navigation/Navigation.jsx', () => () => <div>Navigation</div>);
// jest.mock('../../components/MessagingUsersList/MessagingUsersList.jsx', () => () => <div>UserList</div>);
// jest.mock('../../components/ChatBox/ChatBox.jsx', () => () => <div>ChatBox</div>);

// // mock axios to prevent real HTTP calls
// jest.mock('axios', () => ({
//   get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
// }));

// // mock the useData hook
// jest.mock('../../context/DataProvider', () => ({
//   useData: () => ({
//     userHeaders: {}, // Provide mock headers
//   }),
// }));

// describe('Messages Page', () => {
//   test('renders Messages heading', () => {
//     render(<Messages />);
//     expect(screen.getByText(/Messages/i)).toBeInTheDocument();
//   });

//   test('shows prompt to select a user when none is selected', () => {
//     render(<Messages />);
//     expect(screen.getByText(/Select a user to start chatting/i)).toBeInTheDocument();
//   });
// });



// THIS CODE WORKS REALLY WELL

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Messages from './Messages.jsx';

// // ✅ Mock child components to keep the test simple
// jest.mock('../../components/CurrentUser/CurrentUser.jsx', () => () => <div>CurrentUser</div>);
// jest.mock('../../components/Navigation/Navigation.jsx', () => () => <div>Navigation</div>);
// jest.mock('../../components/MessagingUsersList/MessagingUsersList.jsx', () => () => <div>UserList</div>);
// jest.mock('../../components/ChatBox/ChatBox.jsx', () => () => <div>ChatBox</div>);

// // ✅ Mock axios to prevent real HTTP calls
// jest.mock('axios', () => ({
//   get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
// }));

// // ✅ Mock the useData hook
// jest.mock('../../context/DataProvider', () => ({
//   useData: () => ({
//     userHeaders: {}, // Provide mock headers
//   }),
// }));

// describe('Messages Page', () => {
//   test('renders Messages heading', () => {
//     render(<Messages />);
//     expect(screen.getByText(/Messages/i)).toBeInTheDocument();
//   });

//   test('shows prompt to select a user when none is selected', () => {
//     render(<Messages />);
//     expect(screen.getByText(/Select a user to start chatting/i)).toBeInTheDocument();
//   });
// });



import React from 'react';
import { render, screen } from '@testing-library/react';
import Messages from './Messages.jsx';

// mock child components to keep the test simple
jest.mock('../../components/CurrentUser/CurrentUser.jsx', () => () => <div>CurrentUser</div>);
jest.mock('../../components/Navigation/Navigation.jsx', () => () => <div>Navigation</div>);
jest.mock('../../components/MessagingUsersList/MessagingUsersList.jsx', () => () => <div>UserList</div>);
jest.mock('../../components/ChatBox/ChatBox.jsx', () => () => <div>ChatBox</div>);

// mock axios to prevent real HTTP calls
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
}));

// mock the useData hook
jest.mock('../../context/DataProvider', () => ({
  useData: () => ({
    userHeaders: {}, // Provide mock headers
  }),
}));

describe('Messages Page', () => {
  test('renders Messages heading', () => {
    render(<Messages />);
    expect(screen.getByText(/Messages/i)).toBeInTheDocument();
  });

  test('shows prompt to select a user when none is selected', () => {
    render(<Messages />);
    expect(screen.getByText(/Select a user to start chatting/i)).toBeInTheDocument();
  });
  
  test('renders the messaging users list', () => {
    render(<Messages />);
    expect(screen.getByText('UserList')).toBeInTheDocument();
  });
});