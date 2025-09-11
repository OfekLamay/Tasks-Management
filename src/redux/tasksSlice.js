import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      state.push(action.payload);
    },
    removeTask(state, action) {
      return state.filter(task => task.id !== action.payload);
    },
    updateTask(state, action) {
      const idx = state.findIndex(task => task.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    }
  }
});

export const { setTasks, addTask, removeTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;