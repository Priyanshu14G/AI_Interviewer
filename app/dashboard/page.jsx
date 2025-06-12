import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterViewList from './_components/InterViewList'

function dashboard() {
  return (
    <div className='m-0'>
    <div className='p-10'>
      <h2 className='font-bold text-2-xl'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and start AI Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      <InterViewList/>
    </div>
    </div>
  )
}

export default dashboard