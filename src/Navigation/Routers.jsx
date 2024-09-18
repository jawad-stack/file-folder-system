
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComponentWithHeaderAndSidebar from '../components/ComponentWithHeaderAndSidebar';
import { PrivateRoute } from './PrivateRoute';
import { routes } from '../routerConfig';

const Routers = () => {
    return (
        <Router>
            <Routes>
                {routes.map((item) =>
                    <Route key={item.path} path={item.path} element={item.routeType === "Private" ? <PrivateRoute>
                        <ComponentWithHeaderAndSidebar>{item.element}</ComponentWithHeaderAndSidebar>
                    </PrivateRoute> :
                        <ComponentWithHeaderAndSidebar>{item.element}</ComponentWithHeaderAndSidebar>
                    } />)}
            </Routes>
        </Router>
    )
}

export default Routers