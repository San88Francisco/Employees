import {Employee} from '@prisma/client'
import {Card, Form, Space} from 'antd'
import CustomInput from '../custom-input/input'
import ErrorMessage from '../error-message/error'
import CustomBtn from '../custom-btn/btn'

type Props<T> = {
  onFinish: (values: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}
export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{width: '30rem'}}>
      <Form name='employee-form' onFinish={onFinish} initialValues={employee}>
        <CustomInput type='text' name='firstName' placeholder='Ім`я' />
        <CustomInput type='text' name='lastName' placeholder='Прізвище' />
        <CustomInput type='number' name='age' placeholder='Вік' />
        <CustomInput type='text' name='address' placeholder='Адреса' />
        <Space direction='vertical' size='large'>
          <ErrorMessage message={error} />
          <CustomBtn htmlType='submit'>{btnText}</CustomBtn>
        </Space>
      </Form>
    </Card>
  )
}
