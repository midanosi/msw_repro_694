import React from "react"
import ReactDOM from "react-dom"

import App from "./src/App.jsx"

import { worker } from "./src/__mocks__/browser"

import "antd/dist/antd.min.css"

async function prepare() {
    if (import.meta.env.VITE_MSW_BROWSER_ON) {
        return worker.start()
    }
}
prepare().then(() => {
    ReactDOM.render(<App />, document.getElementById("root"))
})
