import React from 'react'

import { UserMenu } from './UserMenu'

/**
 * Persistent account menu rendered outside the Nav grid entirely (see
 * admin.components.header), so logging out stays reachable even if the
 * sidebar ever fails to render for an unrelated reason.
 */
const AdminHeader: React.FC = () => {
  return (
    <div className="fastora-header-bar">
      <UserMenu />
    </div>
  )
}

export default AdminHeader
