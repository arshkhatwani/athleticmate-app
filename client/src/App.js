import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import News from "./components/News";

const App = () => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const authToken = cookies.AuthToken;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {authToken && (
                    <Route path="/dashboard" element={<Dashboard />} />
                )}
                {authToken && (
                    <Route path="/onboarding" element={<OnBoarding />} />
                )}
                <Route path="/news" element={<News />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
