import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
    const notification = useSelector(({ filter, anecdotes, notification }) => {
        return notification
    })
    const dispatch = useDispatch()

    const style = {
        border: "1px solid",
        padding: "10px",
        marginBottom: "30px"
    }

    return <div style={notification ? style : { display: "none" }}>{notification}</div>;

}

export default Notification





