const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                    style={{ marginBottom: "10px" }}
                />
                <br />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                    style={{ marginBottom: "10px" }}
                />
                <br />
                <button type="submit">Go</button>
            </form>
        </div>
    )
}

export default LoginForm