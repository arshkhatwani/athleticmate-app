const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    };

    return (
        <nav>
            <div className="p-3 pl-5 text-4xl	">
                <span className={minimal ? "text-black" : "text-white"}>
                    AthleticMate
                </span>
            </div>
        </nav>
    );
};
export default Nav;
