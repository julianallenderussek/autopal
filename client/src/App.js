import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import "./App.css"
import Login from './pages/Login';
import AppContext from './context/AppContext';
import AppContextProvider from './context/AppContext';
import Signup from './pages/Signup';
import AutoListings from './pages/AutoListings';
import CreateListing from './pages/CreateListing';
import AutoListing from './pages/AutoListing';
import AppointmentScheduler from './pages/AppointmentScheduler';
import SellerAppointments from './pages/SellerAppointments';
import MyAutoListings from './pages/MyAutoListings';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route path='login' index element={<Login/>}/>
        <Route path='signup' index element={<Signup/>}/>
        <Route path='create_listing' index element={<CreateListing/>}/>
        <Route path='auto_listings' index element={<AutoListings/>}/>
        <Route path='my_auto_listings' index element={<MyAutoListings/>}/>
        <Route path='appointment_scheduler/:listing_id' index element={<AppointmentScheduler/>}/>
        <Route path='auto_listing/:id' index element={<AutoListing/>}/>
        <Route path='sellers_appointments' index element={<SellerAppointments/>}/>
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