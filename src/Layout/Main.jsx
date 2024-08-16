import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const Main = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                 <Outlet/>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Main;