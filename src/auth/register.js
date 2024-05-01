import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate() ;
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (info.password !== info.repeatPassword){
                setErrors({passwordMatch: 'Password do not match.'});
                return ;
            }
            const response = await axios.post('http://localhost:3000/api/register', info);
            console.log("response", response.data);
            if (response)
            navigate('/auth/login')
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.msg){
                setErrors({server: error.response.data.msg});
            } else {
                setErrors({server: "error occured , try later"});
            }
        }
    };
    return (
        <>
        <div className="container mt-5">
        <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="username" name="username" id="username" onChange={handleChange} required/>
                <label>email</label>
                <input type="text" placeholder="email" name="email" id="email" onChange={handleChange} required/>
                <label>password</label>
                <input type="password" placeholder="psword" name="password" id="password" onChange={handleChange} required/>
                <label>repeat password</label>
                <input type="password" placeholder="repeat psword" name="repeatPassword" id="repeatPassword" onChange={handleChange} required/>
                {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}

                <button className="btn-primary" type="submit">Register</button>
                {errors.server && <p className="error">{errors.server}</p>}



            </form>

        </div>
        
        </>
    );
   
};
export default Register;