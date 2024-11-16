import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

 const randomJobs = [1, 2,3 ,4 , 5 ,6 , 7 ,8];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
           
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        // allJobs.map((job) => {
                        //     return (
                        //         <Job key={job._id} job={job}/>
                        //     )
                        // })

                        randomJobs.map((item,index)=>{
                          return(
                            <Job></Job>
                          )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse