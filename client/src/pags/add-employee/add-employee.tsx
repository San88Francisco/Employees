import {Row} from 'antd'
import {Layout} from '../../components/layout/layout'
import {EmployeeForm} from '../../components/employee-form/employee-form'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {selectUser} from '../../features/auth/authSlice'
import {useAddEmployeeMutation} from '../../app/services/employees'
import {Employee} from '@prisma/client'
import {Paths} from '../../paths'
import {isErrorWithMessage} from '../../utils/is-error-with-message'

const AddEmployee = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [addEmployee] = useAddEmployeeMutation()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  const hendAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()

      navigate(`${Paths.status}/created`)
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
        <EmployeeForm
          title='Добавити співробітника'
          btnText='Добавити'
          onFinish={hendAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}

export default AddEmployee
