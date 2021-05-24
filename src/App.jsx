import React from "react"
import { Layout, Menu } from "antd"
import { Link, Route, Router, Switch, useRouteMatch } from "react-router-dom"
import { client } from "./api"
import { createBrowserHistory } from "history"
import { useQuery, gql, ApolloProvider } from '@apollo/client'

export const ROLES_QUERY = gql`
    query Roles {
        roles
    }
`

const HeaderMenu = () => {
    const homeMatch = useRouteMatch({ path: "/", strict: true, exact: true })
    const dogsMatch = useRouteMatch({ path: "/dogs" })
    const catsMatch = useRouteMatch({ path: "/cats" })
    const { data } = useQuery(ROLES_QUERY)
    console.log(`data`, data)

    const menuItems = {
        home: { active: homeMatch, menuKey: "home" },
        dogs: { active: dogsMatch, menuKey: "dogs" },
        cats: { active: catsMatch, menuKey: "cats" },
    }

    const selectedKeys = Object.entries(menuItems)
        .filter(([, entry]) => entry.active)
        .map(([, entry]) => entry.menuKey)

    const catsLinkVisible = data?.roles?.includes("can_see_cats")
    console.log(`catsLinkVisible`, catsLinkVisible)

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
        >
            <Menu.Item key={menuItems.home.menuKey}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key={menuItems.dogs.menuKey}>
                <Link to="/dogs">Dogs</Link>
            </Menu.Item>
            {catsLinkVisible && <Menu.Item key={menuItems.cats.menuKey}>
                <Link to="/cats">Cats</Link>
            </Menu.Item>}
        </Menu>
    )
}

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path="/">
                        <Layout>
                            <Layout.Header>
                                <HeaderMenu />
                            </Layout.Header>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </ApolloProvider>
    )
}

export default App
