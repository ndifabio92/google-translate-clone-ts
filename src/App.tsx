import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Container} from "react-bootstrap"
import Home from "./pages/home/home.tsx"
const App = () => {
    return (
        <Container fluid>
            <h1>Google Translate</h1>
            <Home/>
        </Container>
    )
}

export default App
