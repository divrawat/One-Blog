import AdminDashboard from "@/components/AdminDashboard";
import { getCookie, } from "@/actions/auth";
const token = getCookie('token');


const AdminIndex = () => {


    return (
        <AdminDashboard>
           
           Admin Index

        </AdminDashboard>
    )
}

export default AdminIndex;