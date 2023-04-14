import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogForm/>", () => {

    test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText("title")
        const authorInput = screen.getByPlaceholderText("author")
        const urlInput = screen.getByPlaceholderText("url")
        const submitButton = screen.getByText("Save")

        await user.type(titleInput, "title")
        await user.type(authorInput, "author")
        await user.type(urlInput, "url")
        await user.click(submitButton)

        expect(createBlog.mock.calls).toHaveLength(1)

        expect(createBlog.mock.calls[0][0].title).toBe("title")
        expect(createBlog.mock.calls[0][0].author).toBe("author")
        expect(createBlog.mock.calls[0][0].url).toBe("url")
    })


})