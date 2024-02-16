import styles from './SignUp.module.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.js';


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    // const toggleAccount = () => setNewAccount((prev) => !prev)
    const onChange = (e) => {
        const { target: { name, value } } = e;
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let data ;
        try {
            data = await createUserWithEmailAndPassword(auth, email, password);
            console.log(data);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }

    return (

        <div className={styles.page}>

            <div className={styles.titleWrap}>
                <img src="src/assets/Logo.svg" alt="LOGO"/>
            </div>

            <form onSubmit={onSubmit}>
                <div className={styles.inputIdTitle}>ID</div>
                <div className={styles.inputWrap}>
                    <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange}
                           className={styles.input}/>
                </div>

                <div className={styles.inputPwdTitle}>Password</div>

                <div className={styles.inputWrap}>
                    <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className={styles.input}/>
                </div>

                <div className={styles.ButtonWrap}>
                    <input type="submit" value={"SignUp"} className={styles.signUpButton}/>
                </div>

            </form>
        </div>
    );
}

export default SignUp;