import React from 'react'

/**
 * Robust "+ Add New" button rendered directly above a collection's list
 * table (admin.components.beforeListTable). Payload already ships its own
 * create button in the list view header, but that one is a client
 * component that can render blank if hydration is ever slow — this one is
 * plain server-rendered markup with a real <a> href, so it's guaranteed to
 * show up and work with zero JS.
 */
export const AdminListCreateBanner: React.FC<{
  collectionSlug: string
  label: string
}> = ({ collectionSlug, label }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <a
        href={`/admin/collections/${collectionSlug}/create`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 16px',
          borderRadius: 8,
          background: 'var(--fastora-accent)',
          color: '#fff',
          fontSize: 13.5,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add new {label}
      </a>
    </div>
  )
}

export default AdminListCreateBanner
