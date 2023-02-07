import HomeIcon from '@mui/icons-material/Home';
import { Apartment, Book, CalendarMonth, DepartureBoard, Home, HomeMax, HouseSiding, Key, LocalFireDepartment, MapSharp, MenuBook, NoteAddOutlined, People, PeopleOutlineOutlined, Person2Outlined, Person3Sharp, PersonOffOutlined, RocketLaunch, School, Settings } from '@mui/icons-material';
import Link from 'next/link';
import { CTooltip } from '@coreui/react';

function FirstsideNav() {
    const path = window.location.pathname
    return (<>
        <ul className='firstSide text-center p-2'>
            <li className={(path.includes('dashboard') ? 'activated' : '')}>
                <CTooltip content="Dashboard">
                    <Link href='/centers/dashboard'>
                        <span><HomeIcon /></span>
                    </Link>
                </CTooltip>
            </li>
            <li className={(path.includes('studentlist') || path.includes('institution') || path.includes == 'centers/register' ? 'activated' : '')}>
                <Link href='/centers/studentlist'><span><PeopleOutlineOutlined /></span>
                </Link>
            </li>
            <li className={(path.includes('lecturers') ? 'activated' : '')}>
                <Link href='/centers/lecturers'>
                    <span><School /></span>
                </Link>

            </li>
            <li className={(path.includes('faculties') ? 'activated' : '')}>
                <Link href='/centers/faculties'>
                    <span><Apartment /></span>
                </Link>

            </li>
            <li className={(path.includes('department') ? 'activated' : '')}>
                <Link href='/centers/department'>
                    <span><HouseSiding /></span>
                </Link>

            </li>
            <li className={(path.includes('modules') ? 'activated' : '')}>
                <Link href='/centers/modules'>
                    <span><MenuBook /></span>
                </Link>

            </li>
            <li className={(path.includes('node') ? 'activated' : '')}>
                <Link href="/centers/node">
                    <span><MapSharp /></span>
                </Link>
            </li>
            <li className={(path.includes('session') ? 'activated' : '')}>
                <Link href="/centers/session">
                    <span><CalendarMonth /></span>
                </Link>
            </li>
            <li className={(path.includes('launchcourse') ? 'activated' : '')}>
                <Link href="/centers/launchcourse">
                    <span><RocketLaunch /></span>
                </Link>
            </li>

        </ul>

        <ul className='firstsidebottom text-center p-2 '>
            <li className={(path.includes('profile') ? 'activated' : '')}>
                <Link href="/centers/profile">
                    <Person3Sharp />
                </Link>
            </li>
            <li className={(path.includes('settings') ? 'activated settings' : 'settings')}>
                <Link href="/centers/settings">
                    <Settings />
                </Link>
            </li>
        </ul>
    </>);
}

export default FirstsideNav;