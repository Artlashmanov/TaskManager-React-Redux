export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    children: Task[];  
}
