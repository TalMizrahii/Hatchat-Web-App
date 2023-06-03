function DropItemListBtns({handleLogout, title}){
    return (
        <li onClick={handleLogout}><a className="dropdown-item"  >{title}</a></li>
    );

}

export default DropItemListBtns;