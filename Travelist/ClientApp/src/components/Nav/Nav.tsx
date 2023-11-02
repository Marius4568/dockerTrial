import { Link } from 'react-router-dom';

import Button from '../Button/Button.tsx';

export default function Nav() {
  return (
    <nav role="navigation" className='flex gap-4'>
      <Link to='/login'><Button theme="gray" title="Login" /></Link>
      <Link to='/register'><Button theme="green" title="Sign up" /></Link>
    </nav>
  );
}
