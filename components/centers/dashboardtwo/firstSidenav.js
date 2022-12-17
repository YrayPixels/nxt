import HomeIcon from '@mui/icons-material/Home';
import { Home, Key, NoteAddOutlined, People, Person2Outlined, Person3Sharp, PersonOffOutlined, Settings } from '@mui/icons-material';
import Link from 'next/link';

function FirstsideNav() {
    return (<>
        <ul className='firstSide'>
            <li>
                <Link href='/centers/dashboard'>
                    <span><HomeIcon /></span>
                </Link>

            </li>

            <li>
                <Link href='/centers/studentlist'>
                    <span><People /></span>
                </Link>
            </li>

            <li>
                <Link href='/centers/courses'>
                    <span><NoteAddOutlined /></span>
                </Link>
            </li>

            <li>
                <span><Person2Outlined /></span>
            </li>
            <li>
                <span><Key /></span>
            </li>
        </ul>

        <ul className='firstsidebottom'>
            <li>
                <Person3Sharp />
            </li>
            <li className='settings'>
                <Settings />
            </li>
        </ul>
    </>);
}

export default FirstsideNav;