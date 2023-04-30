import React from "react";

function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={
                "text-white rounded-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium px-5 py-2.5 text-center " +
                (className ? className : "")
            }
        >
            {children}
        </button>
    );
}

export default Button;
