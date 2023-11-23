import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux/stores/store.ts';
import Button from '../Button/Button.tsx';

export default function Nav() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <nav role="navigation" className='flex gap-4'>
      {currentUser ? (
        <>
          <Link to='/destinationForm'><Button theme='gray' title='New Post' /></Link>
          <Link to='/profile' className='flex items-center'>
            <FaUserCircle className='mr-2 text-2xl' />
            Profile
          </Link>
        </>
      ) : (
        <>
          <Link to='/login'><Button theme="gray" title="Login" /></Link>
          <Link to='/register'><Button theme="green" title="Sign up" /></Link>
        </>
      )}
    </nav>
  );
}
