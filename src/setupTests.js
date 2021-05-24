import { client } from "./api"

import "@testing-library/jest-dom/extend-expect"

import { server } from "./__mocks__/server.js"
// Establish API mocking before all tests.
beforeAll(() => {
    console.log(`listening to server`)
    server.listen()
})
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    server.resetHandlers()

    // and clear apollo cache
    // for new apollo client
    client.stop() // https://github.com/apollographql/apollo-client/issues/3766#issuecomment-578075556
    client.clearStore()

    // for old apollo client
    client.cache.reset()
})
// Clean up after the tests are finished.
afterAll(() => server.close())
