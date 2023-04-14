import PropTypes from "prop-types";

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {

    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleUsernameChange: PropTypes.func.isRequired,
        handlePasswordChange: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                    style={{ marginBottom: "10px" }}
                />
                <br />
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                    style={{ marginBottom: "10px" }}
                />
                <br />
                <button id="login-button" type="submit">Go</button>
            </form>
        </div>
    )
}

export default LoginForm