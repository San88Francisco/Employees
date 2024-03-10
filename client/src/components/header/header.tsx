import {Layout, Space, Typography, Button} from 'antd'
import styles from './header.module.scss'

export const Header = () => {
   return (
      <Layout.Header className={styles.header}>
         <Space>
            <Typography className={styles.teamIcon}></Typography>
            <Button type='link'>Click</Button>
         </Space>
      </Layout.Header>
   )
}
