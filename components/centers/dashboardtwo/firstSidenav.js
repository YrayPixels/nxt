import HomeIcon from '@mui/icons-material/Home';
import { Home, Key, NoteAddOutlined, People, Person2Outlined, Person3Sharp, PersonOffOutlined, Settings } from '@mui/icons-material';

function FirstsideNav() {
    return (<>
        <ul className='firstSide'>
            <li>
                <span><HomeIcon /></span>
            </li>
            <li> <span><People /></span>
            </li>
            <li><span><NoteAddOutlined /></span>
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
            <li>
                <Settings />
            </li>
        </ul>
    </>);
}

export default FirstsideNav;