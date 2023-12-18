function validation(values){
    let error={}
    const email_pattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const password_Pattern = /^[A-Za-z]\w{7,14}$/
    
    if(values.email === ""){
        error.email = "email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "incorrect email provided"

    }
    else{
        error.email =""
    }

    if(values.password ==="") {
        error.password ="password should not be empty"
    }
    else if(!password_Pattern.test(values.passwors)){
        error.password = "try again"
    }
    else{
        error.password=""
    }
   return error;
}
export default validation;