import { Button, Form, Input, Modal, Space ,message} from 'antd'
import React, { ComponentProps, FC, memo, useEffect } from 'react'

interface IProps extends ComponentProps<typeof Modal> {
  isView?: boolean
  onConfirm?: (values: { name: string, desc: string }) => void
  detail?: Model.Task;
}

const info = () => {
  message.info('保存成功');
};



const OptionModal: FC<IProps> = ({ isView = false , onConfirm, detail, ...props}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (props.open && isView) {
      form.setFieldsValue(detail);
    }
    if (!props.open) {
      form.resetFields();
    }
  }, [isView, props.open, detail, form])

  const handleFinish = (values: any) => {
    onConfirm?.(values)
  }

  return (
    <Modal title={isView ? '任务详情' : '新建任务'} forceRender footer={null} {...props}>
      <Form form={form} disabled={isView} onFinish={handleFinish}>
        <Form.Item label='任务名称' name='name' extra="任务名称为2-20个字" rules={[{ min: 2, max: 20, message: '请输入任务名称', required: true }]}>
          <Input min={2} maxLength={20}/>
        </Form.Item>
        <Form.Item label='任务描述' name='desc' extra='说说自己要干什么' rules={[{ min: 1, message: '请输入任务描述', required: true }]}>
          <Input/>
        </Form.Item>
        {
          isView ? null : (
            <Form.Item>
              <Space style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit" onClick={info}>
                  确认
                </Button>
                <Button onClick={(e: any) => props.onCancel?.(e)}>
                  取消
                </Button>
              </Space>
            </Form.Item>
          )
        }

      </Form>
    </Modal>
  )
}

export default memo(OptionModal)
