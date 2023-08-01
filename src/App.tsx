import './App.css';
import Dashboard from './pages/DashBoard';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddProduct from './pages/AddProduct';
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/AddProduct" element={<AddProduct />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
