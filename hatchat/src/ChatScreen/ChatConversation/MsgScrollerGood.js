function MsgScrollerGood({children}) {
    return (
        <div className="chatWrap pt-3 pe-3" data-mdb-perfect-scrollbar="true">
            {children}
        </div>
    );
}

export default MsgScrollerGood;