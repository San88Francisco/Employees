import {useState} from 'react'
import {Layout} from '../../components/layout/layout'
import {Card, Form, Row, Space, Typography} from 'antd'
import CustomInput from '../../components/custom-input/input'
import PasswordInput from '../../components/password-input/password-input'
import CustomBtn from '../../components/custom-btn/btn'
import {Link, useNavigate} from 'react-router-dom'
import {Paths} from '../../paths'
import {UserData, useLoginMutation} from '../../app/services/auth'
import {isErrorWithMessage} from '../../utils/is-error-with-message'
import ErrorMessage from '../../components/error-message/error'

const Login = () => {
  const navidate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      navidate('/')
    } catch (err) {
      const maybeError = isErrorWithMessage(err)

      if (maybeError) {
        setError(err.data.message)
      } else {
        setError('Невідома помилка')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Війти' style={{width: '30rem'}}>
          <Form onFinish={login}>
            <CustomInput type='email' name='email' placeholder='Email' />
            <PasswordInput name='password' placeholder='Password' />
            <CustomBtn type='primary' htmlType='submit'>
              Війти
            </CustomBtn>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Немає акаунта? <Link to={Paths.register}> Зареєструватись</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Login
