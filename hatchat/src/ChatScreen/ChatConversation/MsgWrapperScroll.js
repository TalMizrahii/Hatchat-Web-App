function MsgWrapperScroll({children}) {
    return (
        <div className="DivWithScroll">
            <div id="chatBoxOfMessages">
                {children}
            </div>
        </div>
    );
}

export default MsgWrapperScroll;