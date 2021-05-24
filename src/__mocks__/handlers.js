import { graphql } from "msw"

export const handlers = [
    graphql.query("Roles", (req, res, ctx) => {
        console.log(`in roles handler`)
        return res(
            ctx.data({}),
        )
    }),
]
