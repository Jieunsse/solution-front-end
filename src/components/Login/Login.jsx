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



                <div className={styles.inputPwdTitle}>Password</div>
                <div className={styles.inputWrap}>
                    <input className={styles.input} placeholder="PassWord" type="password"/>
                </div>


            </div>

            <div>
                <button onClick={handleSignIn}>
                    <img src="/src/assets/Google/button.svg" alt="구글 로그인 버튼" className={styles.ImgButton}/>
                </button>
            </div>

        </div>
    );
}


export default Login;

