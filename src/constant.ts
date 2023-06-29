export enum TaskStatus {
  Todo = -1,
  Doing = 0,
  Done = 1
}

export const DEFAULT_TODO_DATA: Model.Task[] = [
  {
    id: 1,
    name: '第一天的任务',
    desc: '熟悉zent组件',
    status: -1
  },
  {
    id: 2,
    name: '第二天的任务',
    desc: '开发一个TODO LIST',
    status: -1
  },
  {
    id: 3,
    name: '第三天的任务',
    desc: '熟悉 Node 和 Dubbo 的调用',
    status: -1
  },
]
