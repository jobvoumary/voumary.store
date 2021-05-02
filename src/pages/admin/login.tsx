import Header from "../../components/Header";
import Input from "../../components/Input";
import { Form } from "../../components/ModalAddFood/styles";
import style from "../../styles/login.module.scss"
import { useState } from 'react';
import api from "../../services/api";

export default function Login(){
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [showLoginError, setShowLoginError] = useState(false)

    const handleSubmit = async(values) =>{
        setShowLoginError(false)
        setIsSubmiting(true)
        const response = await api.post(`/login`, values);
        setIsSubmiting(false)
        const { isValid } = response.data
        if(isValid){
            window.location = "/admin/painel"
        }
        else{
            setShowLoginError(true)
        }
    }
    return(
        <div>
            <Header openModal={()=>{}} />
            <div className={style.loginContainer}>
                <Form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Input label="Login" name="username"/>
                    <Input label="Senha" name="password" type="password"/>
                    <span className={style.errorMessage}>
                        {showLoginError ? ('Usuário ou senha inválidos. Tente novamente') : null}
                    </span>
                    <button type="submit" disabled={isSubmiting}>
                        <p className="text">
                            {isSubmiting ? "Aguarde..." : "Entrar"}
                        </p>
                    </button>
                </Form>
            </div>
        </div>
    )
}