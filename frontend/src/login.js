import React,{useState,useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import validation from './LoginValidation'
import axios from 'axios'
function Login(){
    const[values,setValues]  = useState({
        email: '',
        password: ''
    })
    const navigate= useNavigate();
    const [errors,setErrors] =useState({})
    const handleInput=(event)=>{
    setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }
    
   axios.defaults.withCredentials = true;

   useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res => {
     if(res.data.valid){
       navigate('/home');
     }else{
         navigate('/');
     }
    })
    .catch(err=> console.log(err))
 })
    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.email ==="" && errors.password===""){
            axios.post('http://localhost:8081/',values)
            .then(res => {
               if(res.data.login){
                navigate('/home');
               }else{
                 alert("invalid credentials");
               }
            })
            .catch(err =>console.log(err))
           }

    }
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log in</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        < label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="enter email" name='email' onChange={handleInput} className='form-control rounded=0'/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        < label htmlFor="password"><strong>password</strong></label>
                        <input type="password" placeholder="enter password" name='password' onChange={handleInput} className='form-control rounded=0'/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    
                        <button type='submit' className= 'btn btn-default border w-100 bg-light rounded-0 tect-decoration-none'>Log in</button>
                        <p>you have agreed to our terms and conditions</p>
                        <Link to="/signup"className='btn btn-default border w-100 bg-light rounded-0 tect-decoration-none'>create Account</Link>
                   
                </form>
            </div>
        </div>
    )
   
    
}
export default Login