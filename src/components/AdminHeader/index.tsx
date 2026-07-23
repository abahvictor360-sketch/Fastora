import React from 'react'

/**
 * Persistent logout link rendered outside the Nav grid entirely (see
 * admin.components.header), so it stays reachable even if the sidebar
 * ever fails to render for an unrelated reason.
 */
const AdminHeader: React.FC = () => {
  return (
    <div className="fastora-header-bar">
      <a href="/admin/logout">Log out</a>
    </div>
  )
}

export default AdminHeader
