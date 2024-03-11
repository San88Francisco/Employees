import {Form, Input, message} from 'antd'
import {NamePath} from 'antd/es/form/interface'

type Props = {
  name: string
  placeholder: string
  dependencies?: NamePath[]
}

const PasswordInput = ({name, placeholder, dependencies}: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Обов`язкове поле',
        },
        ({getFieldValue}) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve()
            }
            if (name === 'confirmPassword') {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Паролі повині збігатись'))
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error('Пароль повиний бути більше 6 символів')
                )
              }
              return Promise.resolve()
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size='large'></Input.Password>
    </Form.Item>
  )
}

export default PasswordInput
