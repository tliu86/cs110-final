import { useState } from "react"

const LoginPage = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        let userAuth = {
            userName: user, 
            password: pass
        };
        fetch("/login", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userAuth)
        }).then(response => response.json()).then(data => {
            console.log(data)
        })
        console.log("Clicked");
        console.log(userAuth);
    }

    return (  
        <div className="loginPage">
            <h2> NoteNode Login: </h2>
            <form onSubmit={handleSubmit}>
                <label> Username: </label>
                <input type="text" name="username" value={user} onChange={(e) => setUser(e.target.value)} required/>
                <label> Password: </label>
                <input type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                <button> Log in </button>
            </form>
        </div>
    );
}
 
export default LoginPage;