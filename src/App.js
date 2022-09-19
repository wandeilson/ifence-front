import SessionProvider from "main/SessionProvider";
import AppRoutes, { AppRoutes2 } from "./main/AppRoutes";
import Navbar from "./components/Navbar"

function App() {
    return (
        <>
            <SessionProvider>
                <AppRoutes />
            </SessionProvider>
        </>
    );
}

export default App;
