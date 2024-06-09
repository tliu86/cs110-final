const LoginPage = () => {
    return (  
        <div className="loginPage">
            <h2> Welcome to NoteNode </h2>
            <form>
                <label> Username: </label>
                <input type="text" required/>
                <label> Password: </label>
                <input type="password" name="password" required/>
                <button> Log in </button>
            </form>
        </div>
    );
}
 
export default LoginPage;