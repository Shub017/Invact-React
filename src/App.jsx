
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../Components/Home/Home'
import { Provider } from 'react-redux'
import { store } from '../store'
import Navbar from '../Components/Navbar/Navbar'
import MovieForm from '../Components/Add_Movie/addMovie'
import UpdateMovie from '../Components/UpdateMovie/UpdateMovie'
function App() {
  
  const route = createBrowserRouter([
    {
      path:'/home',
      element:
      <div><Navbar /><Home />
      </div>
    },
    {
      path:'/',
      element:<div><Navbar /><Home />
      </div>
    },
    {
      path:'/addMovie',
      element:<div>
        <Navbar />
        <MovieForm />
      </div>
    },
    {
      path:'/updateMovie',
      element:<div>
        <Navbar />
        <UpdateMovie />
      </div>
    }
  ])

  return (
    <>
      <Provider store={store}>
      
      <RouterProvider router={route} />
      </Provider>
    </> 
  )
}

export default App
