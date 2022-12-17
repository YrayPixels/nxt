import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
// const getPrograms = async () => {
//     const response = await fetch('https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes')
//     const data = await response.json()
//     return data.result
// }
function SelectProgram({ programs }) {

    console.log(programs)
    // const { data, error } = useSWR('programs', getPrograms)
    return (<>
        <div className="mb-3">
            <label htmlFor="programme">Programme</label>
            <select name="programme" onChange={(e) => setUserInfo(
                { ...userInfo, programme_id: e.target.value })} class="form-select" aria-label="Default select example">

                <option selected>Select your program</option>
                {/* {
                    programs.map(program => {
                        return (
                            <option value={program.id}>{program.title}</option>

                        )
                    })

                } */}

            </select>
        </div>
    </>
    );
}

export default SelectProgram;

export async function getServerSideProps() {
    const response = await fetch('https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes')
    const data = await response.json()
    return {
        props: {
            programs: data.result,
        },
    }

}