import {Layout} from '../../components/layout/layout'
import {Card, Form, Row, Space, Typography} from 'antd'
import CustomInput from '../../components/custom-input/input'
import PasswordInput from '../../components/password-input/password-input'
import CustomBtn from '../../components/custom-btn/btn'
import {Link} from 'react-router-dom'
import {Paths} from '../../paths'

const Login = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Війти' style={{width: '30rem'}}>
          <Form onFinish={() => null}>
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
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Login
