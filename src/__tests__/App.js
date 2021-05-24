import React from "react"

import App from "../App"
import { render, screen, waitFor } from "@testing-library/react"

import { graphql, server } from "../__mocks__/server"

describe("Header menu", () => {

    describe("Default routing behaviour", () => {
        test("Dogs routes to /dogs page", () => {
            render(<App />)
            expect(
                screen.getByRole("link", { name: "Dogs" }),
            ).toHaveAttribute("href", expect.stringMatching("/dogs"))
        })
        test("Cats routes to /cats page (if have can_see_cats role)", async () => {
            server.use(
                graphql.query("Roles", (req, res, ctx) =>
                    res(
                        ctx.data({
                            roles: [
                                "can_see_cats"
                            ],
                        }),
                    ),
                ),
            )
            // const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
            // await wait(2000)
            render(<App />)


            await waitFor(() =>
                expect(
                    screen.getByRole("link", {
                        name: "Cats",
                    }),
                ).toBeInTheDocument(),
            )
            expect(screen.getByRole("link", { name: "Cats" })).toHaveAttribute(
                "href",
                expect.stringMatching("/cats"),
            )
        })
    })

    describe("Same cats test but in different describe block", () => {
        test("Cats routes to /cats page (if have approp role)", async () => {
            server.use(
                graphql.query("Roles", (req, res, ctx) =>
                    res(
                        ctx.data({
                            roles: [
                                "can_see_cats"
                            ],
                        }),
                    ),
                ),
            )

            render(<App />)

            await waitFor(() =>
                expect(
                    screen.getByRole("link", {
                        name: "Cats",
                    }),
                ).toBeInTheDocument(),
            )
        })
        test("Don't show Cats link if don't have role", () => {
            server.use(
                graphql.query("Roles", (req, res, ctx) =>
                    res(ctx.data({ roles: [] })),
                ),
            )

            render(<App />)

            expect(
                screen.queryByRole("link", {
                    name: "Cats",
                }),
            ).not.toBeInTheDocument()
        })
    })
})