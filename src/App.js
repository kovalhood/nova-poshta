import Header from "./components/Header";
import { Navigate, Route, Routes } from 'react-router-dom';
import Wrapper from "./components/Wrapper";
import TtnPage from "./pages/TtnPage";
import BranchesPage from "./pages/BranchesPage";

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
            
        <Route path="/ttn-check"
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
    </>
  );
}

export default App;
