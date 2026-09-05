import { Outlet } from 'react-router-dom';
import {Header} from './Header';
import {Footer} from './Footer';

function Layout () {
return (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <main className="flex-grow-1 container-fluid  my-4">
      <Outlet /> {/* Здесь будет рендериться контент конкретной страницы */}
    </main>
    <Footer />
  </div>
);
}
export default Layout;
