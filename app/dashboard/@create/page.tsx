// app/dashboard/page.tsx
import React from 'react';
import ImageCreation from '@/components/replicate/ImageCreation';

const DashboardPage = () => {
  return (
      <div className="dashboard-content">
        <h1>Image Creation</h1>
          <ImageCreation />
      </div>
  );
};

export default DashboardPage;
