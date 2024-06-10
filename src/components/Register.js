import { useState } from "react"

const Register = () => {
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        let userAuth = {
            email: email,
            userName: user, 
            password: pass
        };
        fetch("/create-new-user", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userAuth)
        }).then(response => response.json()).then(data => {
            console.log(data)
        })
        console.log("Clicked");
        console.log(userAuth);
        console.log("Attempting to create new user...")
    }

    return (  
        <div className="register">
            <h2> Join NoteNode: </h2> 
            <form onSubmit={handleSubmit}>
                <label> Enter a valid Email: </label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <label> Enter a valid Username: </label>
                <input type="text" name="username" value={user} onChange={(e) => setUser(e.target.value)} required/>
                <label> Enter a strong Password: </label>
                <input type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                <button> Register </button>
            </form>
        </div>
    );
}
 
export default Register;