import { Link } from 'react-router-dom'
import { IoIosSunny,IoIosMoon} from 'react-icons/io';

export const Links = ({classname,handleTheme,theme}) => {
  return (
    <div className={classname}>
      <div onClick={handleTheme} className="icon" >
        {theme=="dark"?<IoIosSunny size="20"/>:<IoIosMoon size="20"/>}
      </div>
      <Link to='/'>Home</Link>
      <Link to='/About'>About</Link>
      <Link to='/Country'>Country</Link>
      <Link to="/Contact">Contact</Link>
    </div>
  )
}
