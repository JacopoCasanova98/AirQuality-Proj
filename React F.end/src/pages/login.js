import React, { useState } from 'react';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Stato per gestire se l'utente è loggato
    const [loginFailed, setLoginFailed] = useState(false); // Stato per gestire se il login fallisce

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });
    
        if (response.ok) {
            // Ottenere il token JWT dal corpo della risposta e fare qualcosa con esso
            const data = await response.json();
            console.log('Login success:', data);
            setIsLoggedIn(true); // Imposta l'utente come loggato
            setLoginFailed(false); // Resetta il messaggio di errore se il login va a buon fine
        } else {
            console.log('Login failed');
            setLoginFailed(true); // Imposta il messaggio di errore se il login fallisce
        }
        const footer = document.querySelector('footer');
        footer.style.position = 'relative';
        footer.style.top = '10em';
    };

    return (
        <div>
            <div>
                <h2 className='login-title'>Login</h2>
                {isLoggedIn ? ( // Mostra il messaggio se l'utente è loggato
                    <p>Login effettuato con successo! ✅</p>
                ) : (
                    <div>
                        <form onSubmit={handleLoginSubmit} className='form-structure'>
                            <input 
                                className='input-form'
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                            <input
                                className='input-form'
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className='button-b'>Login</button>
                        </form>
                        {loginFailed && <p className='login-signup-error'>Login non riuscito, riprovare</p>} {/* Mostra il messaggio di errore se il login fallisce */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
