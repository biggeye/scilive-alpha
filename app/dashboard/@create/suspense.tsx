// app/dashboard/suspense.tsx
import React, { Suspense } from 'react';
import LoadingComponent from './loading';

const DashboardSuspense = ({ children }) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      {children}
    </Suspense>
  );
};

export default DashboardSuspense;
