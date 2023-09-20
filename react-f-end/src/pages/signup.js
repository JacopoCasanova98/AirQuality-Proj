import React, { useState } from 'react';

const Signup = () => {
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [message, setMessage] = useState(''); // Stato per il messaggio dal backend

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://aq-server.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: signupEmail,
                    password: signupPassword,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration success:', data);
                setMessage('Registrazione effettuata con successo!'); // Imposta il messaggio di successo
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
                setMessage(`Registrazione fallita: ${errorData.message}`); // Imposta il messaggio di errore dal backend
            }
        } catch (error) {
            console.error('Errore durante la registrazione', error);
            setMessage('Errore durante la registrazione'); // Imposta un messaggio generico di errore
        }
        const footer = document.querySelector('footer');
        footer.style.position = 'relative';
        footer.style.top = '10em';
    };

    return (
        <div>
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit} className='form-structure'>
                    <input
                        className='input-form'
                        type="email"
                        placeholder="Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                    />
                    <input
                        className='input-form'
                        type="password"
                        placeholder="Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                    />
                    <input
                        className='input-form'
                        type="password"
                        placeholder="Confirm Password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        required
                    />
                    <p className='message-sign-up'>{message}</p>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
