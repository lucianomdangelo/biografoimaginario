import { useState } from "react";
import {userServiceFactory} from "../clientServices/userService";
import useUser from "../lib/useUser";

const userService = userServiceFactory();

export default function Login() {
    const { user, mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: true,
    });
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            mutateUser(
                await userService.login(username, password)
            );
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    const usernameHandler =  (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler =  (e) => {
        setPassword(e.target.value);
    }

    return <div>
        {!user ? (<h1>Loading....</h1>) : 
                <>{!user.isLoggedIn && <form onSubmit={handleSubmit}>
                        {/* <div className="imgcontainer">
                            <img src="img_avatar2.png" alt="Avatar" className="avatar"/>
                        </div> */}

                        <div className="container">
                            <label htmlFor="uname"><b>Nombre de usuario</b></label>
                            <input type="text" placeholder="Ingresar usuario" name="uname" required onChange={usernameHandler}/>

                            <label htmlFor="psw"><b>Contraseña</b></label>
                            <input type="password" placeholder="Ingresar contraseña" name="psw" required onChange={passwordHandler}/>

                            <button type="submit">Iniciar sesion</button>
                        </div>
                </form>}</>}
    </div>;
}