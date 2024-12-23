import { Avatar, Dropdown, MenuProps, Space, Typography } from 'antd'

const { Text } = Typography

const RightHeader = () => {
  const items: MenuProps['items'] = [
    {
      key: 2,
      label: <Text>Déconnexion</Text>,
      onClick: () => {},
    },
  ]

  return (
    <Space>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <Avatar
          style={{
            color: '#fff',
            backgroundColor: '#6c7cff',
            cursor: 'pointer',
          }}
        >
          {'--'}
        </Avatar>
      </Dropdown>
    </Space>
  )
}

export default RightHeader
