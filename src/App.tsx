import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import EditByAdmin from './pages/EditByAdmin';

type Page = 'home' | 'menu' | 'edit';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // initialize from pathname (so /edit-by-admin works when opened directly)
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/menu') setCurrentPage('menu');
    else if (path === '/edit-by-admin') setCurrentPage('edit');
    else setCurrentPage('home');

    // keep history navigation in sync
    const onPop = () => {
      const p = window.location.pathname;
      if (p === '/menu') setCurrentPage('menu');
      else if (p === '/edit-by-admin') setCurrentPage('edit');
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigateToMenu = () => {
    setCurrentPage('menu');
    window.history.pushState({}, '', '/menu');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.history.pushState({}, '', '/');
  };

  const navigateToEdit = () => {
    setCurrentPage('edit');
    window.history.pushState({}, '', '/edit-by-admin');
  };

  return (
    <>
      {currentPage === 'home' && <Home onNavigateToMenu={navigateToMenu} />}
      {currentPage === 'menu' && <Menu onNavigateHome={navigateToHome} />}
      {currentPage === 'edit' && <EditByAdmin />}
      {/* Optionally add a small admin shortcut during dev:
          <button onClick={navigateToEdit}>Open Admin</button> */}
    </>
  );
}

export default App;