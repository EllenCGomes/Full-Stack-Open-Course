import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        notifyNewAnecdote(state, action) {
            const string = `You added the anecdote '${action.payload}'`
            return string
        },
        notifyNewVote(state, action) {
            const string = `You voted '${action.payload}'`
            return string
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const { notifyNewAnecdote, notifyNewVote, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer