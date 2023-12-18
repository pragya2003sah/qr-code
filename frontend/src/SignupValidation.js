function validation(values) {
    let error= {}
    const email_pattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const password_Pattern = /^[A-Za-z]\w{7,14}$/
    
    if(values.name === ""){
        error.name = "name should not be empty"
    }
    else{
        error.name =""
    }

    if(values.email === ""){
        error.email = "email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "provide better email"

    }
    else{
        error.email = ""
    }

    if(values.password ==="") {
        error.password ="password should not be empty"
    }
    else if(!password_Pattern.test(values.passwors)){
        error.password = "provide better password"
    }
    else{
        error.password=""
    }
   return error;
}
export default validation;