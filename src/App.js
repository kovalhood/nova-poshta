import Header from "./components/Header";
import { Navigate, Route, Routes } from 'react-router-dom';
import Wrapper from "./components/Wrapper";
import TtnPage from "./pages/TtnPage";
import BranchesPage from "./pages/BranchesPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
