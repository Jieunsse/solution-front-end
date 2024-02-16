import styles from './Login.module.css';
import { auth } from '../../Firebase/firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAtom } from 'jotai';
import { userDataAtom } from "../Atoms/Atoms.js";

const Login = () => {

    const [userData, setUserData] = useAtom(userDataAtom);

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((data) => {
                setUserData(data.user);
                alert("Login success");
            })
            .catch((err) => {
                console.log(err);
                alert("Login failed");
            });
    }


    return (
        <div className={styles.page}>

            <div className={styles.titleWrap}>
                <img src="src/assets/Logo.svg" alt="LOGO"/>
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
                    <button onClick={handleSignIn} className={styles.ImgButtonWrap}>
                        <img src="/src/assets/Google/button.svg" alt="구글 로그인 버튼" className={styles.ImgButton}/>
                    </button>
                </div>

                <div className={styles.ButtonWrap}>
                    <button className={styles.signInButton}> Sign In </button>
                </div>

        </div>
    );
}


export default Login;

