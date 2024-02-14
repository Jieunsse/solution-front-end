import styles from './Login.module.css';
import { auth } from '../../Firebase/firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';


const Login = () => {

    const [userData, setUserData] = useState(null);

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((data) => {
                setUserData(data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className={styles.page}>

            <div className={styles.titleWrap}>
                지금 이 자리에
                <br/>
                로고가 들어갈 예정이에요.
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.inputIdTitle}>ID</div>
                <div className={styles.inputWrap}>
                    <input className={styles.input} placeholder="test@gmail.com"  />
                </div>

                {/*<div className={styles.errorMessageWrap}>*/}
                {/*    Please check your ID.*/}
                {/*</div>*/}

                <div className={styles.inputPwdTitle}>Password</div>
                <div className={styles.inputWrap}>
                    <input className={styles.input} placeholder="PassWord" type="password"/>
                </div>

                {/*<div className={styles.errorMessageWrap}>*/}
                {/*    Please check your PassWord.*/}
                {/*</div>*/}
            </div>
            <div>
                <button className={styles.signInButton} onClick={handleSignIn}>
                    Google Login
                </button>
            </div>
            <div>
                <button className={styles.signInButton}  >
                    Sign In
                </button>
            </div>

        </div>
    );
}


export default Login;

