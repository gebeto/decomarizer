// import Store from 'electron-store';

export type TaskItem = string;

// const store = new Store<Record<string, TaskItem>>({ name: 'tasks' });
class LocalStore<TItem> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  set(value: TItem, key: string) {
    const data = JSON.parse(localStorage.getItem(this.name) || '{}');

    localStorage.setItem(
      this.name,
      JSON.stringify({
        ...data,
        [key]: value,
      }),
    );

    window.electron.ipcRenderer.sendMessage('create-task', 'Hello world');
  }

  delete(key: string) {
    const data = JSON.parse(localStorage.getItem(this.name) || '{}');

    delete data[key];
    localStorage.setItem(this.name, JSON.stringify(data));
  }

  get(key: string) {
    const data = JSON.parse(localStorage.getItem(this.name) || '{}');

    return data[key] as TItem;
  }

  getAll() {
    const data = JSON.parse(localStorage.getItem(this.name) || '{}');

    return Array.from(Object.keys(data)) as TItem[];
  }
}
const tasksStore = new LocalStore<TaskItem>('tasks');

export const addItem = (item: TaskItem) => {
  tasksStore.set(new Date().toISOString(), item);
};

export const deleteItem = (item: TaskItem) => {
  tasksStore.delete(item);
};

export const getAllItems = (): TaskItem[] => {
  return tasksStore.getAll();
};
