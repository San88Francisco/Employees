import {Layout, Space, Typography} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import styles from './header.module.scss'
import CustomBtn from '../custom-btn/btn'
import {Paths} from '../../paths'
import {LoginOutlined, UserOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {logout, selectUser} from '../../features/auth/authSlice'

export const Header = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogoutClick = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <Typography className={styles.teamIcon}></Typography>
        <Link to={Paths.home}>
          <CustomBtn type='link'>
            <Typography.Title level={1}>Співробітники</Typography.Title>
          </CustomBtn>
        </Link>
      </Space>
      {user ? (
        <CustomBtn
          type='default'
          icon={<LoginOutlined />}
          onClick={onLogoutClick}
        >
          Вийти
        </CustomBtn>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomBtn type='link' icon={<UserOutlined />}>
              Зареєструватись
            </CustomBtn>
          </Link>
          <Link to={Paths.login}>
            <CustomBtn type='link' icon={<LoginOutlined />}>
              Війти
            </CustomBtn>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}
