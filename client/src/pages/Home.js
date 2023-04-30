import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../components/Button";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const authToken = cookies.AuthToken;

    const handleClick = () => {
        if (authToken) {
            removeCookie("UserId", cookies.UserId);
            removeCookie("AuthToken", cookies.AuthToken);
            window.location.reload();
            return;
        }
        setShowModal(true);
        setIsSignUp(true);
    };

    const handleClickLogin = () => {
        setShowModal(true);
        setIsSignUp(false);
    };

    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">Stay Fit.</h1>

                <div className="flex flex-col jutify-center items-center">
                    <Button onClick={handleClick} className="mb-3 text-base">
                        {authToken ? "Signout" : "Create Account"}
                    </Button>

                    {!authToken && (
                        <Button
                            onClick={handleClickLogin}
                            className={"text-base"}
                        >
                            Login
                        </Button>
                    )}
                </div>

                {showModal && (
                    <AuthModal
                        setShowModal={setShowModal}
                        isSignUp={isSignUp}
                    />
                )}
            </div>
        </div>
    );
};
export default Home;
