import {Layout} from '../../components/layout/layout'
import {Card, Form, Row, Space, Typography} from 'antd'
import CustomInput from '../../components/custom-input/input'
import PasswordInput from '../../components/password-input/password-input'
import CustomBtn from '../../components/custom-btn/btn'
import {Link} from 'react-router-dom'
import {Paths} from '../../paths'

const Register = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Зареєструватись' style={{width: '30rem'}}>
          <Form onFinish={() => null}>
            <CustomInput name='name' placeholder='Name' />
            <CustomInput type='email' name='email' placeholder='Email' />
            <PasswordInput name='password' placeholder='Password' />
            <PasswordInput
              name='confirmPassword'
              placeholder='Repeat your password'
            />
            <CustomBtn type='primary' htmlType='submit'>
              Зареєструватись
            </CustomBtn>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Вже маєте акаунт? <Link to={Paths.login}> Війти</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Register
