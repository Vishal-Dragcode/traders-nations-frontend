import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children, noPadding = false }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#050a15' }}>
      {/* Sidebar - Fixed/Locked */}
      <AdminSidebar />
      
      {/* Scrollable Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AdminHeader />
        
        {/* Only this area scrolls */}
        <main style={{ 
          flex: 1, 
          padding: noPadding ? '0' : '10px', 
          overflowY: 'auto', 
          background: '#050a15',
          scrollbarWidth: 'thin',
          scrollbarColor: '#1e293b transparent'
        }}>
          <div style={{ maxWidth: noPadding ? 'none' : '1600px', margin: noPadding ? '0' : '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
