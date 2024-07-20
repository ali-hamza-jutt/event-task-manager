import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const EventList = ({ events, onSelectEvent }) => {
  return (
    <List>
      {events.map((event) => (
        <ListItem key={event.id} button onClick={() => onSelectEvent(event)}>
          <ListItemText primary={event.title} secondary={new Date(event.start).toLocaleString()} />
        </ListItem>
      ))}
    </List>
  );
};

export default EventList;
