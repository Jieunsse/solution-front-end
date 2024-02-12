import styles from './Login.module.css';
import {useState} from "react";

const Login = () => {

    const [Id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const [validId, setValidId] = useState(false);
    const [validPwd, setValidPwd] = useState(false);


    const handleId = (e) => {
        setId(e.target.value);
        const regExp = new RegExp(/^[A-Za-z0-9]{5,14}$/);
        if(regExp.test(validId.toString())) {
            setValidId(true);
        } else {
            setValidId(false);
        }
    }

    const handlePwd = (e) => {
        setPwd(e.target.value);
        const regExp = new RegExp(/^[A-Za-z0-9]{5,14}$/);
        if(regExp.test(validPwd.toString())) {
            setValidPwd(true);
        } else {
            setValidPwd(false);
        }

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
                    <input className={styles.input} placeholder="test@gmail.com" value={Id} onChange={handleId} />
                </div>

                <div className={styles.errorMessageWrap}>
                    Please check your ID.
                </div>

                <div className={styles.inputPwdTitle}>Password</div>
                <div className={styles.inputWrap}>
                    <input className={styles.input} placeholder="PassWord" value={pwd} onChange={handlePwd} type="password"/>
                </div>

                <div className={styles.errorMessageWrap}>
                    Please check your PassWord.
                </div>
            </div>
            <div>
                <button className={styles.signInButton} disabled={true}>
                    Sign In
                </button>
            </div>
        </div>
    );
}


export default Login;

