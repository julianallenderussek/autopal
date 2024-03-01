import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import "./App.css"
import Login from './pages/Login';
import AppContext from './context/AppContext';
import AppContextProvider from './context/AppContext';
import Signup from './pages/Signup';
import AutoListings from './pages/AutoListings';
import CreateListing from './pages/CreateListing';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route path='login' index element={<Login/>}/>
        <Route path='signup' index element={<Signup/>}/>
        <Route path='create_listing' index element={<CreateListing/>}/>
        <Route path='auto_listings' index element={<AutoListings/>}/>
      </Route>
    )
  )

  return (
    <AppContextProvider>
      <div className="App">
        <header className="App-header">
          <RouterProvider router={router}/>        
        </header>
      </div>
    </AppContextProvider>
  );
}

export default App;


const Root = () => {
  return (
  <>
    <Outlet/>
  </>
  )
}