import HomeIcon from '@mui/icons-material/Home';
import { Apartment, Home, Key, NoteAddOutlined, People, PeopleOutlineOutlined, Person2Outlined, Person3Sharp, PersonOffOutlined, RocketLaunch, School, Settings } from '@mui/icons-material';
import Link from 'next/link';

function FirstsideNav() {

    return (<>
        <ul className='firstSide text-center p-2'>
            <li>
                <Link href='/centers/dashboard'>
                    <span><HomeIcon /></span>
                </Link>
            </li>
            <li>
                <Link href='/centers/studentlist'><span><PeopleOutlineOutlined /></span>
                </Link>
            </li>
            <li>
                <Link href='/centers/lecturers'>
                    <span><School /></span>
                </Link>

            </li>
            <li>
                <Link href='/centers/faculties'>
                    <span><Apartment /></span>
                </Link>

            </li>
            <li>
                <Link href='/centers/courses'>
                    <span><NoteAddOutlined /></span>
                </Link>

            </li>
            <li>
                <Link href="/centers/launchprogram">
                    <span><RocketLaunch /></span>
                </Link>
            </li>
        </ul>
        <ul className='firstsidebottom text-center p-2 '>
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