const Notification = ({ message }) => {
    if (message == null) return
    return (
        <div className={message.includes("Added") ? "added" : "error"}>
            {message}
        </div>
    )
}

export default Notification