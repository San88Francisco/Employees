import {Button, Result, Row} from 'antd'
import React from 'react'
import {Link, useParams} from 'react-router-dom'

const Statuses: Record<string, string> = {
  created: 'Користувачa успішно створено',
  updated: 'Користувач успішно обновлений',
  deleted: 'Користувачa успішно видалено',
}

const Status = () => {
  const {status} = useParams()

  return (
    <Row align='middle' justify='center' style={{width: '100%'}}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : 'Не знайдено'}
        extra={
          <Button key='dashboard'>
            <Link to='/'>На Головну</Link>
          </Button>
        }
      />
    </Row>
  )
}

export default Status
