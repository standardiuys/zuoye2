import { Button, Card, ConfigProvider, Typography } from 'antd'
import React, { FC, memo, useMemo } from 'react'
import { TaskStatus } from '../constant'

interface IProps {
  data: Model.Task
  onChangeStatus?: (id: number, status: number) => void
  onViewDetail?: (id: number) => void
}

const TodoItem: FC<IProps> = ({ data, onChangeStatus, onViewDetail }) => {

  const renderAction = useMemo(() => {
    switch(data.status) {
      case TaskStatus.Todo:
        return (
          <ConfigProvider theme={{ token: { colorText: '#dba812', colorPrimary: '#dba812' } }}>
            <Button onClick={() => onChangeStatus?.(data.id, TaskStatus.Doing)}>点击开始</Button>
          </ConfigProvider>
        )
      case TaskStatus.Doing:
        return (
          <ConfigProvider theme={{ token: { colorText: '#06ab48', colorPrimary: '#06ab48' } }}>
            <Button onClick={() => onChangeStatus?.(data.id, TaskStatus.Done)}>点击完成</Button>
          </ConfigProvider>
        )
      case TaskStatus.Done:
        return (
          <ConfigProvider theme={{ token: { colorText: '#086cc3' } }}>
            <Button onClick={() => onViewDetail?.(data.id)}>查看详情</Button>
          </ConfigProvider>
        )
      default:
        return null;
    }
  }, [data, onChangeStatus, onViewDetail])

  return (
    <Card title={data.name} type='inner' extra={renderAction}>
      <Typography>{data.desc}</Typography>
    </Card>
  )
}

export default memo(TodoItem)
