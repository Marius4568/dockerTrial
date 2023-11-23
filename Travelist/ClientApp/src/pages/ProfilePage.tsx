import { useSelector , useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button/Button.tsx';
import HelloWorld from '../components/HelloWorld/HelloWorld.tsx';
import { logout } from '../redux/slices/userSlice.ts';
import { RootState } from '../redux/stores/store.ts';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const logoutHandler = () => {
    localStorage.removeItem('token');

    dispatch(logout());

    navigate('/');

  };

  return (
    <div className='container'>
      <HelloWorld />
      <h1> Logged in user: {currentUser ? currentUser.name : 'none'}</h1>
      <Button title='Log Out' type='button' theme='green' handleClick={logoutHandler} />
    </div>
  );
}