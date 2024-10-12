import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from "./context/AuthContext";

const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <Navbar />
                <Outlet />
                <Footer />
            </AuthProvider>
        </div>
    );
}

export default App;