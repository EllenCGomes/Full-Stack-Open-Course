import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const Menu = () => {
    const padding = {
        paddingRight: 20
    }
    return (
        <div>
            <Link to="/" style={padding}>anecdotes</Link>
            <Link to="/create" style={padding}>create new</Link>
            <Link to="/about" style={padding}>about</Link>
        </div>
    )
}


export default Menu

