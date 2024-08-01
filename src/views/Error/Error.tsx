import { Typography } from 'antd'
const { Title, Text } = Typography
import NotFound from '@/assets/images/not-found.svg?react'
import './Error.less'

function Error() {
  return (
    <div className="Error">
      <NotFound className="banner" />
      <Title className="title">404 Not Found</Title>
      <Text>The page you visit is not found, please go back home or try again</Text>
    </div>
  )
}

export default Error
