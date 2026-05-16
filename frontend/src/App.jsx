import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Shorturl from './Pages/Urlshortern/Shorturl';
import URLHistory from './Pages/Urlshortern/URLHistory';
import './index.css';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/shorturl' element={<Shorturl/>} />
            <Route path='/Urls/list' element={<URLHistory/>} />
            <Route element={<PrivateRoute/>}>
                
            </Route>
        </Routes>
    </Router>
  )
}

export default App
