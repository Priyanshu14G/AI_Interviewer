'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'
function InterviewItemCard({interview}) {

    const router = useRouter();

    console.log(interview?.mockID);
    const onStart = () =>{
        router.push('/dashboard/interview/' + interview?.mockID);
    }

    const onFeedback = () =>{
       router.push('/dashboard/interview/' + interview?.mockID + '/feedback');
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-blue-500'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-sx text-gray-400'>Created At: {interview?.createdAt}</h2>
        <div className='flex justify-between mt-2'>
            <Button size="sm" variant="outline" className="cursor-pointer" onClick={onFeedback}>Feedback</Button>
            <Button size="sm" className="cursor-pointer" onClick={onStart}>Start</Button>
        </div>
    </div>

  )
}

export default InterviewItemCard