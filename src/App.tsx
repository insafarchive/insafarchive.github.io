/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Application Root Component
 */

import React, { Suspense, lazy } from 'react';
import { ArchiveProvider, useArchive } from './context/ArchiveContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { HomeView } from './views/HomeView';
import { ArchiveExplorerView } from './views/ArchiveExplorerView';
import { DossiersView } from './views/DossiersView';
import { InteractiveTimeline } from './components/timeline/InteractiveTimeline';
import { RecordDetail } from './components/record/RecordDetail';
import { EditorialWorkspace } from './components/admin/EditorialWorkspace';
import { EditorialStandardsView } from './views/EditorialStandardsView';

// Code-split ConstitutionView for GitHub Pages bundle optimization
const ConstitutionView = lazy(() => import('./views/ConstitutionView'));

const LoadingFallback: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--accent-gold)' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Loading Constitution of Pakistan...</div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>آئینِ پاکستان لوڈ ہو رہا ہے...</div>
    </div>
  </div>
);

const MainViewRouter: React.FC = () => {
  const { currentView } = useArchive();

  switch (currentView) {
    case 'home':
      return <HomeView />;
    case 'constitution':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <ConstitutionView />
        </Suspense>
      );
    case 'archive':
      return <ArchiveExplorerView />;
    case 'dossiers':
      return <DossiersView />;
    case 'timeline':
      return <InteractiveTimeline />;
    case 'record':
      return <RecordDetail />;
    case 'admin':
      return <EditorialWorkspace />;
    case 'standards':
      return <EditorialStandardsView />;
    default:
      return <HomeView />;
  }
};

export const App: React.FC = () => {
  return (
    <ArchiveProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <MainViewRouter />
        </main>
        <Footer />
        <QuickSearchModal />
      </div>
    </ArchiveProvider>
  );
};

export default App;
