import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import './App.css'
import { Outlet } from "react-router-dom"
import { Provider} from 'react-redux'
import { store } from "./redux/store"
import { Toaster } from "@/components/ui/toaster"



function App({ children }) {
  return (
    <Provider store={store}>
    <div  className='flex bg-gray-950 h-0'>
      <div id='side-bar-left' >
        <SidebarProvider >
          <AppSidebar />
          <main className="flex">
            {children}
            <Toaster/>
          </main>
          
        </SidebarProvider>
      </div>
      <div id='UpperTabs' className="w-full">
        <Outlet />
      </div>
    </div>
    </Provider>
  )
  

}

export default App
