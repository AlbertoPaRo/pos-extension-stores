import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { DependencyContainerProvider } from './context/DependencyContainer/Provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@extension/ui';
import UserSearchPage from './components/page/UserSeachPage';

const SidePanel = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DependencyContainerProvider>
        <UserSearchPage />
        <Toaster richColors position="bottom-right" />
      </DependencyContainerProvider>
    </QueryClientProvider>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
