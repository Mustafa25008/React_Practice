import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

function Layout() {
    return(
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap min-vh-100">
                    <div className="col border bg-light p-2 m-3 " style={{ width: '200px', minWidth: '180px' }}>
                        <NavBar />
                    </div>
                    <div className="col p-3 m-3 bg-light border" style={{ width: '1020px', minWidth: '100%' }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Layout;