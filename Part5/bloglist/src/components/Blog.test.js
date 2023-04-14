import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog/>", () => {

    //gives global access
    let container
    let mockHandler

    beforeEach(() => {
        mockHandler = jest.fn() //simulate onClick handler function

        const blog = {
            title: "title",
            author: "author",
            url: "url",
            likes: 1,
            user: {
                name: "teste"
            }
        }

        container = render(
            <Blog blog={blog} updateLike={mockHandler} />
        ).container //render the component container
    })

    test("renders content", () => {

        const title = screen.getByText("title", { exact: false })
        const author = screen.getByText("author", { exact: false })

        expect(title).toBeDefined()
        expect(author).toBeDefined()

        const div = container.querySelector(".blogDetails")
        expect(div).toHaveStyle("display: none")
    })

    test("show details when button is clicked", async () => {

        const user = userEvent.setup()

        const button = container.querySelector(".button")

        await user.click(button)

        const div = container.querySelector(".blogDetails")
        expect(div).not.toHaveStyle("display: none")

    })

    test("if the like button is clicked twice, the event handler is called twice", async () => {

        const user = userEvent.setup()

        const button = container.querySelector(".buttonLike")

        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)

    })
})
