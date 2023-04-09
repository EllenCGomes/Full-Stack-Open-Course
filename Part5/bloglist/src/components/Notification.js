import PropTypes from "prop-types";

const Notification = ({ message }) => {

    if (message === null) return

    Notification.propTypes = {
        message: PropTypes.string.isRequired,
    }

    return (
        <div className={message.includes("Saved") ? "added" : "error"}>
            {message}
        </div>
    )
}

export default Notification