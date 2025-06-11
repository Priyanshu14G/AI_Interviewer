'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Webcam from 'react-webcam';
import Link from 'next/link';

function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    const GetInterviewDetails = async () => {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockID, params.interviewId));
      setInterviewData(result[0]);
    };
    if (params?.interviewId) GetInterviewDetails();
  }, [params]);

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>

      <div className='grid grid-col-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-5'>
          {interviewData ? (
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
              <h2 className='text-2xl'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
              <h2 className='text-2xl'><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
              <h2 className='text-2xl'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
            </div>
          ) : (
            <p className='text-lg'>Loading Interview Details...</p>
          )}

          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>Enable video WEB Cam and Microphone to Start your AI Generated Mock Interview, it has 5 questions which you can answer and in the end you will get the report on the basis of your answer. NOTE: we never record your video, Web cam access you can disable at any time if you want</h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
              <Button variant='ghost' className='w-full' onClick={() => setWebCamEnabled(true)}>Enable Webcam and Microphone</Button>
            </>
          )}
        </div>
      </div>

      <div className='flex justify-end items-end'>
          <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button>Start</Button>
          </Link>
      </div>
    </div>
  );
}

export default Interview;
