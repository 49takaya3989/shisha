import { Grid } from '@mantine/core'

import { AdminHeader } from 'pages/admin/layout/Header'
import { AdminSidebar } from 'pages/admin/layout/Sidebar'
import { Props } from 'pages/type'

export const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <AdminHeader />
      <Grid pt={60} w="100vw" h="100vh">
        <Grid.Col span={2} p={0} pos="relative">
          <AdminSidebar />
        </Grid.Col>
        <Grid.Col span={10} p={50}>
          {children}
        </Grid.Col>
      </Grid>
    </div>
  )
}
