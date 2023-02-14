import { Avatar, CircularProgress, Input } from '@mui/material';

import { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Add, EmailOutlined, FiveG } from '@mui/icons-material';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

// Main Func
function StudentsList(props) {
    const { details, bearer } = props
    const [programs, setProgram] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [department, setDepartment] = useState([]);
    const [filter, setfilter] = useState(false);
    const [Inst, setInst] = useState([]);
    const [filterData, setFilterData] = useState(' ');
    const [datali, setDatali] = useState(' ');
    const [delay, setDelay] = useState(' ')

    const fetchFillables = () => {
        const allFaculties = `https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/${details.id}`
        const allPrograms = "https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes"
        const allDept = `https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/${details.id}`


        const getAllPrograms = axios.get(allPrograms);
        const getAllFaculties = axios.get(allFaculties);
        const getAllDept = axios.get(allDept);


        axios.all([getAllPrograms, getAllFaculties, getAllDept,]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allFacultiesData = allData[1].data.result;
                const allDeptData = allData[2].data.result;


                setProgram(allProgramsData)
                // setCourses(allCoursesData)
                setFaculties(allFacultiesData)
                setDepartment(allDeptData)
            })
        )
    }


    function filterStud(std_id, filterby) {
        if (filterby == 'program') {
            var config = {
                method: 'get',
                url: `https://stockmgt.gapaautoparts.com/api/GetAllStudentsByProgrammeId/${std_id}`,
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            const fetchData = () => {
                axios(config)
                    .then(function (response) {
                        const data = response.data;
                        setFilterData(data.students)
                        return data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            fetchData()
        } else if (filterby == 'department') {
            var config = {
                method: 'get',
                url: `https://stockmgt.gapaautoparts.com/api/viewRegisteredStudentByModule/`,
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            const fetchData = () => {
                axios(config)
                    .then(function (response) {
                        const data = response.data;
                        setFilterData(data.students)
                        return data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            fetchData()


        } else if (filterby == 'faculty') {
            var config = {
                method: 'get',
                url: `https://stockmgt.gapaautoparts.com/api/GetAllStudentsByFacultyId/${std_id}`,
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            const fetchData = () => {
                axios(config)
                    .then(function (response) {
                        const data = response.data;
                        setFilterData(data.students)
                        return data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            fetchData()
        }
    }


    setInterval(() => {
        setDelay(Math.random());
    }, 1000)
    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/center/GetStudentByCenterId/6154417375300G0`,
        headers: {
            'Authorization': `Bearer 2863|r7wlhGF11SnMBUJA1Dn9qdX9PcI6jTMJI1fhcPwp`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const fetchData = () => {
        axios(config)
            .then(res => {
                setDatali(res.data.students)
                // console.log(datali)
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    useEffect(() => {
        if (datali.length == 0 || datali == ' ') {
            fetchData()
        }
    }, [delay])
    function deleteStud(param) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const deleteStudent = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/HideStudent/${param}`, requestOptions)
            const data = await response.json()
            // console.log(response.status)
            if (response.status == 200) {
                // setNotify('Faculty Deleted Successfully')
                Swal.fire({
                    title: 'Student Deleted Succesfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                fetchData()
            } else if (response.status == 400) {
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
            return data;
        }

        deleteStudent()
    }
    function showFilters() {
        setfilter(!filter)
        fetchFillables()
    }
    return (
        <div>
            <div className='d-flex align-items-center justify-content-between py-4'>
                <p>Registered Students</p>
                <div className='text-end'>
                    <div className='d-flex p-2'>
                        <button onClick={showFilters} className='bg-info shadow btn btn-sm'> filter by<Add size={1} /></button>
                        <div className={filter ? ' ' : 'd-none'}>
                            <ul className='filter d-flex justify-content-around'>
                                <li>
                                    <select className='form-select' name="" id="">
                                        <option selected>course</option>

                                        {
                                            programs.map(program => {
                                                return (
                                                    <option onClick={() => {
                                                        filterStud(`${program.id}`, `program`)
                                                    }} value={program.id}>{program.title}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </li>
                                <li>
                                    <select className='form-select' name="" id="">
                                        <option value="">faculty</option>
                                        {
                                            faculties.map(faculties => {
                                                return (
                                                    <option onClick={() => {
                                                        filterStud(`${faculties.id}`, `faculty`)
                                                    }} value={faculties.id}>{faculties.title}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-info p-4 shadow rounded-0 table-responsive">

                <div>
                    <h6 className="fw-bold">Total No of Students:  {datali.length}</h6>
                </div>
                <table className="tableData table table-striped table-sm table-hover  ">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>STUDENT'S NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>FACULTY</th>
                            <th>DEPARTMENT</th>
                            <th>COURSE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData == " " ?
                            datali == ' ' ? <p><CircularProgress /></p> :
                                datali.map(student => {
                                    return (
                                        <tr key={student.id} className='align-items-center '>
                                            <td>{datali.indexOf(student) + 1}</td>
                                            <td><span><img src="" alt="" /></span> {student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.faculties_title}</td>
                                            <td>{student.departments_title} </td>
                                            <td>{student.programmes_title}</td>


                                            <td className='btn-group'>
                                                <Link href={`/centers/studentlist/${student.id}`} >
                                                    <button className='btn btn-sm btn-primary'>View</button>
                                                </Link>
                                                <button onClick={() => deleteStud(`${student.id}`)} className="btn btn-sm btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            : filterData.map(student => {
                                return (
                                    <tr key={student.id} className='align-items-center '>
                                        <td>{filterData.indexOf(student) + 1}</td>
                                        <td><span><img src="" alt="" /></span> {student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.faculties_title}</td>
                                        <td>{student.departments_title} </td>
                                        <td>{student.programmes_title}</td>
                                        <td className='btn-group'>
                                            <Link href={`/centers/studentlist/${student.id}`} >
                                                <button className='btn btn-sm btn-primary'>View</button>
                                            </Link>
                                            <button onClick={() => deleteStud(`${student.id}`)} className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default StudentsList;