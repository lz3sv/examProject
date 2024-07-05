import companyLogo from '../assets/logo.png'
import './Nav.css'
import LoginUsers from './LogingUsers'
import GuestUsers from './GuestUsers'
export default function Nav(props){

const hasUser=true

    return (

<div className="navigation">
<nav>
    <img src={companyLogo} alt="societe logo" />
    <ul>
        {/*All users*/}
        <li><a href="/">Начало</a></li>
        <li><a href="/about">Относно</a></li>
        <li><a href="/catalog">Последни публикации</a></li>
        {hasUser ? <LoginUsers/> : <GuestUsers/>}
       
    </ul>
</nav>
</div>


    )
}


//"In God we trust and everything else we check."
