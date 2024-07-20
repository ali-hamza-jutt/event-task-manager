import React, { useState, useEffect } from 'react';
import EventCalendar from '../../components/EventCalender/EventCalender';
import EventList from '../../components/EventList/EventList';
import EventForm from '../../components/EventForm/EventForm';
import api from '../../services/api';
import './EventsPage.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventSubmit = async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="events-page">
      <div className="event-row">
        <div className="event-form-container">
          <EventForm onSubmit={handleEventSubmit} />
        </div>
        <div className="event-calendar-container">
          <EventCalendar events={events} onSelectEvent={handleEventSelect} />
        </div>
      </div>
      <div className="event-list-container">
        <EventList events={events} onSelectEvent={handleEventSelect} />
      </div>
    </div>
  );
};

export default EventsPage;
