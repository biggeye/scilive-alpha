// app/dashboard/page.tsx
import React from 'react';
import ImageCreation from '@/components/replicate/ImageCreation';

const DashboardPage = () => {
  return (
      <div className="dashboard-content">
          <ImageCreation />
      </div>
  );
};

export default DashboardPage;
