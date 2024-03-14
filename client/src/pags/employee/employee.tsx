import {useState} from 'react'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from '../../app/services/employees'
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/auth/authSlice'
import {Descriptions, Divider, Modal, Space} from 'antd'
import {Layout} from '../../components/layout/layout'
import CustomBtn from '../../components/custom-btn/btn'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import ErrorMessage from '../../components/error-message/error'
import {Paths} from '../../paths'
import {isErrorWithMessage} from '../../utils/is-error-with-message'

const Employee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const params = useParams<{id: string}>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {data, isLoading} = useGetEmployeeQuery(params.id || '')
  const [removeEmployee] = useRemoveEmployeeMutation()
  const user = useSelector(selectUser)

  if (isLoading) {
    return <span>Завантаження</span>
  }
  if (!data) {
    return <Navigate to='/' />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const hideModal = () => {
    setIsModalOpen(false)
  }
  const handleDeleteUser = async () => {
    hideModal()
    try {
      await removeEmployee(data.id).unwrap()

      navigate(`${Paths.status}/deleted`)
    } catch (error) {
      const maybeError = isErrorWithMessage(error)

      if (maybeError) {
        setError(error.data.message)
      } else {
        setError('Невідома помилка')
      }
    }
  }
  return (
    <Layout>
      <Descriptions title='Інформація про співробітника' bordered>
        <Descriptions.Item
          label='Ім`я'
          span={3}
        >{`${data.firstName} ${data.lastName} `}</Descriptions.Item>
        <Descriptions.Item
          label='Вік'
          span={3}
        >{`${data.age}`}</Descriptions.Item>
        <Descriptions.Item
          label='Адреса'
          span={3}
        >{`${data.address}`}</Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation='left'>Дія</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomBtn shape='round' type='default' icon={<EditOutlined />}>
                Редагувати
              </CustomBtn>
            </Link>
            <CustomBtn
              shape='round'
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Видалити
            </CustomBtn>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title='Підтвердіть видалення'
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText='Підтвердити'
        cancelText='Відмінити'
      >
        Ви точно хочете видалити співробітника з таблиці?
      </Modal>
    </Layout>
  )
}

export default Employee
