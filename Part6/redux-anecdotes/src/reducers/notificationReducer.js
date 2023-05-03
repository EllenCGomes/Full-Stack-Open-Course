import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        notifyNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const { notifyNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time = 5) => {

    return dispatch => {
        dispatch(notifyNotification(content))

        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }

}

export default notificationSlice.reducer