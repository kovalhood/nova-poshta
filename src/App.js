import Header from "./components/Header";
import { Navigate, Route, Routes } from 'react-router-dom';
import Wrapper from "./components/Wrapper";
import TtnPage from "./pages/TtnPage";
import BranchesPage from "./pages/BranchesPage";
import ScrollToTop from 'react-scroll-up';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './services/styles';
import sprite from './images/icons.svg';

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/"
          element={
            <Wrapper>
              <TtnPage />
            </Wrapper>}
        />
            
        <Route path="/branches"
          element={
            <Wrapper>
              <BranchesPage />
            </Wrapper>}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ScrollToTop showUnder={140} style={styles.upButton}>
        <svg style={{ fill: '#D9291C' }} width="16" height="16" aria-label="logo">
            <use href={`${sprite}#arrow-up`}></use>
        </svg>
      </ScrollToTop>
      
      <ToastContainer autoClose={3000} theme="colored" transition={Slide}/>
    </>
  );
}

export default App;
