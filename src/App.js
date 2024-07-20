import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import EventsPage from './Pages/EventPage/EventPage';
import TasksPage from './Pages/TaskPage/TaskPage';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 ,color:'#000000'}}>
            Events and Tasks Manager
          </Typography>
          <Button color="inherit" href="/">Events</Button>
          <Button color="inherit" href="/tasks">Tasks</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
