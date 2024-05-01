import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [info , setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/login', info);
            if (response){
                localStorage.setItem('token', response.data.result.token);
                localStorage.setItem('isAuth', true)
                navigate('/produit');
            } else {
                console.log('bad requesst');
            }
            return response ;

        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.msg){
                setErrors({ server: error.response.data.msg});
            } else {
                setErrors({server: 'an error occured . try again'});
            }
        }
    };

    return (
        <>
        <div className="container mt-5">
            <h1>Login</h1>
            <form action="/login" method="post">
            <label htmlFor="email"> email </label>
            <input type="text" name="email" id="email" onChange={handleChange}/> <br/>

            <label htmlFor="password"> password </label>
            <input type="password" name="password" id="password" onChange={handleChange}/> <br/>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}> log in </button>
            {errors.server && <p className="error">{errors.server}</p>}
            
            </form>

        </div>
        
        </>
    );
};
export default Login;
