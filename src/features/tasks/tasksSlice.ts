import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Task } from '../../types';
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
            state.tasks.push({ ...action.payload, id: nanoid(), children: [] });
        },
        removeTask(state, action: PayloadAction<string>) {
            function recursiveRemove(tasks: Task[], taskId: string): Task[] {
                return tasks.reduce((acc, task) => {
                    if (task.id === taskId) return acc; 
                    const updatedChildren = recursiveRemove(task.children, taskId);
                    return [...acc, { ...task, children: updatedChildren }];
                }, [] as Task[]);
            }
            state.tasks = recursiveRemove(state.tasks, action.payload);
        },
        removeTasks(state, action: PayloadAction<string[]>) {
            const idsToRemove = new Set(action.payload);
            function recursiveFilter(tasks: Task[]): Task[] {
                return tasks.filter(task => !idsToRemove.has(task.id)).map(task => ({
                    ...task,
                    children: recursiveFilter(task.children)
                }));
            }
            state.tasks = recursiveFilter(state.tasks);
        },
        addChildTask(state, action: PayloadAction<{ parentId: string, child: Omit<Task, 'id'> }>) {
            function recursiveAdd(tasks: Task[], parentId: string, child: Task): Task[] {
                return tasks.map(task => {
                    if (task.id === parentId) {
                        const newChildren = [...task.children, { ...child, id: nanoid(), children: [] }];
                        return { ...task, children: newChildren };
                    }
                    return { ...task, children: recursiveAdd(task.children, parentId, child) };
                });
            }
            state.tasks = recursiveAdd(state.tasks, action.payload.parentId, { ...action.payload.child, id: nanoid(), children: [] });
        },
    },
});

export const { addTask, removeTask, removeTasks, addChildTask } = tasksSlice.actions;
export default tasksSlice.reducer;
