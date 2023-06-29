import { Button, Col, Row, Card, Space, Alert, Carousel, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import { cloneDeep } from 'lodash-es'
import { DEFAULT_TODO_DATA, TaskStatus } from './constant';
import TodoItem from './components/TodoItem';
import { arrToMap } from './utils';
import { useBoolean } from 'ahooks';
import OptionModal from './components/OptionModal';

let startId = 4;

function App() {
  const [todosMap, setTodosMap] = useState(arrToMap('id', DEFAULT_TODO_DATA))
  const [open, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false)
  const [isView, { set: SetIsView }] = useBoolean(false)
  const [currentTask, setCurrentTask] = useState<Model.Task>()

  const handleConfirm = (values: any) => {
    const cloneMap = cloneDeep(todosMap);
    cloneMap[startId] = { id: startId, ...values, status: TaskStatus.Todo }
    setTodosMap(cloneMap);
    startId++;
    closeModal()
  }

  const handleViewDetail = useCallback((id: number) => {
    const todo = todosMap[id]
    setCurrentTask(todo);
    SetIsView(true)
    openModal()
  }, [SetIsView, openModal, todosMap])

  const handleChangeStatus = useCallback((id: number, status: number) => {
    const cloneMap = cloneDeep(todosMap);
    const todo = cloneMap[id]
    todo.status = status
    setTodosMap(cloneMap)
  }, [todosMap])

  const renderTodo = useCallback((todo: Model.Task) => {
    return <TodoItem key={todo.id} data={todo} onChangeStatus={handleChangeStatus} onViewDetail={handleViewDetail} />
  }, [handleChangeStatus, handleViewDetail])

  const renderTodos = useCallback((status: TaskStatus | 'ALL') => {
    const list = Object.values(todosMap)
    switch(status) {
      case 'ALL':
        return list.map(renderTodo)
      case TaskStatus.Todo:
        return list.filter(d => d.status === TaskStatus.Todo).map(renderTodo)
      case TaskStatus.Doing:
        return list.filter(d => d.status === TaskStatus.Doing).map(renderTodo)
      case TaskStatus.Done:
        return list.filter(d => d.status === TaskStatus.Done).map(renderTodo)
    }
  }, [todosMap, renderTodo])

  const handleCreateTask = () => {
    SetIsView(false)
    openModal()
  }

  return (
    <Space className="App flex" direction='vertical'>
      <Carousel dotPosition='left' autoplay autoplaySpeed={2000}>
        {
          Object.values(todosMap).map(todo => {
            return (
              <div key={todo.id}>
                <Alert
                  message={todo.name}
                  description={(
                    <Space className='flex item-center justify-between'>
                      <Typography>{todo.desc}</Typography>
                      <Button type='primary' onClick={() => handleViewDetail(todo.id)}>查看详情</Button>
                    </Space>
                  )}
                  type="info"
                  showIcon
                />
              </div>
            )
          })
        }
      </Carousel>

      <Row gutter={16}>
        <Col span={6}>
          <Card title="所有任务" extra={<Button type='primary' onClick={handleCreateTask}>新建任务</Button>}>
            <Space direction='vertical' style={{ display: 'flex' }}>
              {renderTodos('ALL')}
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="TODO">
            <Space direction='vertical' style={{ display: 'flex' }}>
              {renderTodos(TaskStatus.Todo)}
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="DOING">
            <Space direction='vertical' style={{ display: 'flex' }}>
              {renderTodos(TaskStatus.Doing)}
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="DONE">
            <Space direction='vertical' style={{ display: 'flex' }}>
              {renderTodos(TaskStatus.Done)}
            </Space>
          </Card>
        </Col>
      </Row>
      <OptionModal
        isView={isView}
        detail={currentTask}
        open={open}
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </Space>
  );
}

export default App;
