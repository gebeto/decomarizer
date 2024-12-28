// import Store from 'electron-store';

export type TaskItem = string;

// const store = new Store<Record<string, TaskItem>>({ name: 'tasks' });
class LocalStore<TItem> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  set(key: string, value: TItem) {
    const data = JSON.parse(localStorage.getItem(this.name) || '{}');

    localStorage.setItem(
      key,
      JSON.stringify({
        ...data,
        [key]: value,
      }),
    );
  }

  get(key: string) {
    const data = JSON.parse(localStorage.getItem(this.name) || '{}');

    return data[key] as TItem;
  }

  getAll() {
    const data = JSON.parse(localStorage.getItem(this.name) || '{}');

    return Array.from(Object.values(data)) as TItem[];
  }
}
const tasksStore = new LocalStore<TaskItem>('tasks');

export const addItem = (item: TaskItem) => {
  tasksStore.set(new Date().toISOString(), item);
};

export const getAllItems = (): TaskItem[] => {
  return tasksStore.getAll();
};
