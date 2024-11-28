import MainLayout from '../components/layouts/MainLayout'
import Admin from '../pages/Admin'
import AllSections from '../pages/AllSections'
import Borrow from '../pages/Borrow'
import Borrowed from '../pages/Borrowed'


const AdminRoute=[
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/Admin',
                element:<Admin/>
            },
            {
                path:'/AllSections',
                element:<AllSections/>
            },
            {
                path:'/Borrow',
                element:<Borrow/>
            },
            {
                path:"/Borrowed",
                element:<Borrowed/>
            },
        ]
    }
]

export default AdminRoute