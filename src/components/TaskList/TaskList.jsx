import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const TaskList = ({ tasks, onSelectTask }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} button onClick={() => onSelectTask(task)}>
          <ListItemText primary={task.title} secondary={new Date(task.dueDate).toLocaleString()} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
