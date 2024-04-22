import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Task } from '../../types';
import { notification } from 'antd';  
import dayjs from 'dayjs';

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [{
        id: '1',
        title: 'Действительная задача',
        description: 'Это автоматический пример',
        dueDate: dayjs().add(1, 'day').toISOString(),
        children: [],
    }],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Omit<Task, 'id' | 'children'>>) {
            if (!action.payload.title.trim() || !action.payload.description.trim() || !action.payload.dueDate.trim()) {
                notification.error({
                    message: 'Ошибка ввода',
                    description: 'Поля надо заполнить',
                    duration: 4.5,
                });
                return;
            }
            state.tasks.push({ ...action.payload, id: nanoid(), children: [] });
        },
        removeTask(state, action: PayloadAction<string>) {
           
        },
        removeTasks(state, action: PayloadAction<string[]>) {
           
        },
        addChildTask(state, action: PayloadAction<{ parentId: string, child: Omit<Task, 'id'> }>) {
            if (!action.payload.child.title.trim() || !action.payload.child.description.trim() || !action.payload.child.dueDate.trim()) {
                notification.error({
                    message: 'Ошибка ввода',
                    description: 'поля надо заполнить',
                    duration: 4.5,
                });
                return;
            }
           
    },
});

export const { addTask, removeTask, removeTasks, addChildTask } = tasksSlice.actions;
export default tasksSlice.reducer;

export const { addTask, removeTask, removeTasks, addChildTask } = tasksSlice.actions;
export default tasksSlice.reducer;
