import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import BookSeat from './pages/BookSeat';
import MyBookings from './pages/MyBookings';
import Offers from './pages/Offers';
import TrackBus from './pages/TrackBus';
import CancelTicket from './pages/CancelTicket';
import BookingConfirmation from './pages/BookingConfirmation';
import Help from './pages/Help';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="book/:tripId" element={<BookSeat />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="offers" element={<Offers />} />
          <Route path="track-bus" element={<TrackBus />} />
          <Route path="cancel-ticket" element={<CancelTicket />} />
          <Route path="booking-confirmation/:bookingId" element={<BookingConfirmation />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
