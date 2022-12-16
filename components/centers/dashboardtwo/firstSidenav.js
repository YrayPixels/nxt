import HomeIcon from '@mui/icons-material/Home';
import { Home, Key, NoteAddOutlined, Person2Outlined, PersonOffOutlined } from '@mui/icons-material';

function FirstsideNav() {
    return (<>
        <ul>
            <li>
                <span><HomeIcon /></span> Dashboard
            </li>
            <li> <span><Home /></span>
                Manage Students
            </li>
            <li><span><NoteAddOutlined /></span>
                Courses
            </li>

            <li>
                <span><Person2Outlined /></span>Profile
            </li>
            <li>
                <span><Key /></span>Sign Out
            </li>
        </ul>
    </>);
}

export default FirstsideNav;