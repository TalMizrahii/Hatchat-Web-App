function HeaderBox({children}) {
    return (
        <h1 className="headerOfBox">
            <div className="header">
                {children}
            </div>
        </h1>
    );
}

export default HeaderBox;