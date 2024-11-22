const PrivateDisplay = ({ children }) => {
    return <>{localStorage.sl ? children : null}</>;
};

export default PrivateDisplay;
