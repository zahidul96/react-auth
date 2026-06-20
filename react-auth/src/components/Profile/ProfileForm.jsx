import classes from './ProfileForm.module.css';
import {useRef, useContext} from 'react';
import AuthContext from '../../store/AuthContext';
const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = (event)=>{
       event.preventDefault();
       const enteredPassword = newPasswordInputRef.current.value;
       fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBB7QrrzH06y2C1B2_Nc1nxpviaokj_qMw",{
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
       }).then(()=>{
        alert("Password Changed Successfully");
       })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
