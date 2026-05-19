import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { PageLoader } from './components/ui/Loader';
import { ToastContainer } from './components/ui/Toast';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <AppRoutes key={location.pathname} />
        </AnimatePresence>
      </Suspense>
      <ToastContainer />
    </>
  );
}
