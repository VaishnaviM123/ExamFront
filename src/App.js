import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './componets/Footer';
import Header from './componets/Header';
import Books from './pages/Books';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Books />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
