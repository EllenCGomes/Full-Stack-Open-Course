
const Notification = ({ message }) => {
    if (message == null) return
    return (
        <div className={message.includes("Saved") ? "added" : "error"}>
            {message}
        </div>
    )
}

export default Notification