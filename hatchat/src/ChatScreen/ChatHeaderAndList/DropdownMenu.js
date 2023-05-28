function DropdownMenu({children}){
    return (
        <div id="menu-group-btn" className="btn-group">
            <ul className="dropdown-menu dropdown-menu-end"></ul>
            {children}
        </div>
    );
}

export default DropdownMenu;