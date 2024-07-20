import React, { useState, useEffect } from 'react';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList';
import api from '../../services/api.js';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  return (
    <div>
      <TaskForm onSubmit={handleTaskSubmit} />
      <TaskList tasks={tasks} onSelectTask={handleTaskSelect} />
    </div>
  );
};

export default TasksPage;
