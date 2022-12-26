import { useRouter } from "next/router";

function StudentInfo(student) {
    const router = useRouter()
    const { name, id } = student
    const studentid = router.query.id
    return (<>
        <h2>
            get all the datas
        </h2>
    </>);
}

export default StudentInfo;
export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params
    const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/ViewStudent/${id}`)
    const data = await response.json()
    const student = data.students
    return {
        props: {
            student,
        },
    }
}