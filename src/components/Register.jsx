import './Register.css'
export default function Register(){
    return (

        <div className ="register-box">
        <h1>Регистриране</h1>
        <form method="post">
            <label>Username</label>
            <input type="text" placeholder="Username.." name="username"/>
            <label>Email</label>
            <input type="text" placeholder="Email.." name="email" />
            <label>Password</label>
            <input type="password" placeholder="Password.." name="password" />
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm Password.." name="repass" />
            <input type="submit" value="Регистриране" />
        </form>
        <p> Имате регистрация? <a href="/login" className='bold'>Вписване</a></p>
        </div>


    )
}