const PageContainer = ({ children }) => {
    return (
        <div className='flex flex-auto min-h-full flex-col justify-center px-6 py-12 lg:px8'>
            {children}
        </div>
    );
};

export default PageContainer;
