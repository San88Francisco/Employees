import {Button, Form} from 'antd'

type Props = {
   children: React.ReactNode
   htmlType?: 'button' | 'submit' | 'reset' | undefined
   onClick?: () => void
   type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
   danger?: boolean
   loading?: boolean
   shape?: 'default' | 'circle' | 'round' | undefined
   icon?: React.ReactNode
}

const CustomBtn = ({
   children,
   htmlType = 'button',
   type,
   danger,
   loading,
   shape,
   icon,
   onClick,
}: Props) => {
   return (
      <Form.Item>
         <Button
            type={type}
            htmlType={htmlType}
            danger={danger}
            loading={loading}
            shape={shape}
            icon={icon}
            onClick={onClick}
         >
            {children}
         </Button>
      </Form.Item>
   )
}

export default CustomBtn
