import HomeIcon from '@mui/icons-material/Home';
import { Apartment, Home, Key, NoteAddOutlined, People, PeopleOutlineOutlined, Person2Outlined, Person3Sharp, PersonOffOutlined, School, Settings } from '@mui/icons-material';
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