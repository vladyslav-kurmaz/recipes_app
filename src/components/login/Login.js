import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { changeUserStatus, changeUserSuccess, updateActiveUser  } from "../../store/UsersStore";

import RecipesService from "../../service/RecipesService";
import Spinner from '../spiner/spiner';
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./Login.scss";
import eyeIcon from '../../image/eye.webp'

const Login = ({login}) => {
    const navigate = useNavigate();
    const {getUsersInfo, postUsersInfo} = RecipesService();
    const dispatch = useDispatch();
    const {usersLoadingStatus} = useSelector((state) => state.user);
    const [showPass, setShowPass] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);

    const [newUser, setNewUser] = useState({
        _id: '',
        name: '',
        surname: '',
        email: '',
        notes: [],
        pass:''
    });
    const [userLogin, setUserLogin] = useState({
        email: '',
        pass: ''
    })

    useEffect(() => {
        if (newUser.pass.length > 3 || userLogin.pass.length > 3) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    }, [newUser.pass, userLogin.pass])


    const requestStatus = (status, message) => {
        switch (status) {
            case 'idle': 
                return;
            case 'loading': 
                return (
                    <Spinner/>
                );
            case 'error': 
                return (
                    <ErrorMessage message={message}/>
                );
            default:
                return
        }
    }

    const userLog = (e, userLogin) => {

        dispatch(changeUserStatus('loading'));
        e.preventDefault();

        getUsersInfo()
            .then(res => res.filter(item => {
                return item.email === userLogin.email && item.pass === userLogin.pass
                }))
            .then((res) => {
                localStorage.setItem('user', res[0].id);
                localStorage.setItem('mail', res[0].email);
                localStorage.setItem('pass', res[0].pass);
                return res;
            })
            .then((res) => {
                dispatch(changeUserSuccess(res))
                dispatch(updateActiveUser(res[0]._id))
                return res
            } )
            .then((res) => {
                navigate(`/${res[0]._id}`)
                dispatch(changeUserStatus('idle'));
            })
            .catch((e) => {
                console.error(e);
                dispatch(changeUserStatus('error'));
                setTimeout(() => dispatch(changeUserStatus('idle')), 3000)
            })
            .finally(() => e.target.reset())
    
    
    }

    const singUp = (e, newUser) => {
        e.preventDefault();
        dispatch(updateActiveUser(newUser._id))
        dispatch(changeUserStatus('loading'));

        getUsersInfo()
            .then(res => res.filter(item => {
                return item.mail === newUser.mail && item.pass === newUser.pass;
            }))
            .then(res => {
                const json = JSON.stringify(newUser)
                res.length > 0 ? dispatch(changeUserStatus('error')) : postUsersInfo(json)
                .then(() => {
                    navigate('/login')
                    dispatch(changeUserStatus('idle'));
                    window.location.reload()
                })
                .catch((e) => {
                    console.error(e);
                    dispatch(changeUserStatus('error'));
                })
                .finally(() => e.target.reset())
            })
    }


    const styleFormInput = (atr, value) => {
        switch (atr) {
            case 'name':
                return value?.length > 3 || value?.length === 0 ? {} : {'border': '1px solid red'};
            case 'surname':
                return value?.length > 3 || value?.length === 0 ? {} : {'border': '1px solid red'};
            case 'mail':
                // eslint-disable-next-line
                return value?.match('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$') || value?.length === 0 || value === undefined ? {} : {'border': '1px solid red'};
            case 'pass':
                
                return value?.length > 3 || value.length === 0 ? {} : {'border': '1px solid red'};
            default:
                return ;
        }
    }


    


    const addInfoNewUser = (e) => {
        switch (e.target.getAttribute('id')) {
            case 'name':
                styleFormInput('name', userLogin.name)
                return setNewUser((state) => { 
                    return{
                    ...newUser,
                    name: e.target.value
                }});
            case 'surname':
                return setNewUser((state) => { 
                    return{
                    ...newUser,
                    surname: e.target.value
                }});
            case 'email':
            return setNewUser((state) => { 
                return{
                ...newUser,
                email: e.target.value
            }});
            case 'pass':
            return setNewUser((state) => { 
                return{
                ...newUser,
                pass: e.target.value,
                _id: uuidv4()
            }});
            default:
                return
        }
       
    }

    const enterUserInfo = (e) => {
        switch (e.target.getAttribute('id')) {
            case 'email':
                return setUserLogin((state) => { 
                    return{
                    ...userLogin,
                    email: e.target.value
                }});
            case 'pass':
                return setUserLogin((state) => { 
                    return{
                    ...userLogin,
                    pass: e.target.value
            }});
            default:
                return

        }
    }

    return login ? (
        <div className="auto">
            <h2>Вхід</h2>
            <form className="auto__form"
                onSubmit={(e) => userLog(e, userLogin)}
                >
                <input 
                    className="auto__form-login " 
                    type="email" 
                    id='email' 
                    placeholder="Пошта"
                    onChange={enterUserInfo}
                    required
                    style={styleFormInput('mail', userLogin.mail)}
                    />

                <label htmlFor="pass">
                    <input 
                        className="auto__form-pass " 
                        type={showPass ? 'text' : 'password'} 
                        id='pass' 
                        placeholder="Пароль"
                        onChange={enterUserInfo}
                        required
                        style={styleFormInput('pass', userLogin.pass)}/>
                
                    <img 
                        src={eyeIcon} 
                        className="auto__form-eye" 
                        alt="eye"
                        onClick={() => setShowPass(() => !showPass)} />
                </label>
                


                <button 
                    className="auto__form-enter"
                    disabled={disableBtn}>Увійти</button>
                {requestStatus(usersLoadingStatus, 'Акаунт з таким логіном та паролем не знайдено!')}         
            </form>

            <div className="auto__singup">
                <p className="auto__singup-text">Ви ще не зареєстровані?</p>
                <Link 
                    to='/singup' 
                    className="auto__singup-button">Зареєструватись</Link>
            </div>
        </div>
    ) : (
        <div className="auto">
            <h2>Реєстрація</h2>
            <form 
                className="auto__form"
                onSubmit={(e) => singUp(e, newUser)}
                >
                <input 
                    className="auto__form-name " 
                    type="text" 
                    id='name' 
                    placeholder="І'мя"
                    onChange={addInfoNewUser}
                    required
                    style={styleFormInput('name', newUser.name)}/>
                <input 
                    className="auto__form-login " 
                    type="text" 
                    id='surname' 
                    placeholder="Прізвище"
                    onChange={addInfoNewUser}
                    required
                    style={styleFormInput('surname', newUser.surname)}/>
                <input 
                    className="auto__form-login " 
                    type="email" 
                    id='email' 
                    placeholder="Пошта"
                    onChange={addInfoNewUser}
                    required
                    style={styleFormInput('mail', newUser.mail)}/>
                

                <label htmlFor="pass">

                    <input 
                        className="auto__form-pass " 
                        type={showPass ? 'text' : 'password'}  
                        id='pass' 
                        placeholder="Пароль"
                        onChange={addInfoNewUser}
                        required
                        style={styleFormInput('pass', newUser.pass)}/>
                    <img 
                        src={eyeIcon} 
                        className="auto__form-eye" 
                        alt="eye"
                        onClick={() => setShowPass(() => !showPass)} />
                </label>    
                

                <button
                    // to='/notes'
                    className="auto__form-enter"
                    disabled={disableBtn}
                    >Зареєструватись</button>

                {/* {requestStatus(status, 'Акаунт з таким логіном і паролем вже зареєстровано')} */}
            </form>

            <div className="auto__singup">
                <p className="auto__singup-text">Ви зареєстровані?</p>
                <Link 
                    to='/login' 
                    className="auto__singup-button">Увійти</Link>
            </div>
        </div>
    )    
}

export default Login;
