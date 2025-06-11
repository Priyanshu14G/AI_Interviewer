import { Lightbulb, Speech, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {
  const textToSpeech =(text) => {
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      aleart('Sorry your browser does not support text to speech');
    }
  }
  return mockInterviewQuestion&& (
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question, index) => (
                <h2 key={index} className={`p-2 bg-gray-300 rounded-full text-xs md:text-sm text-center ${activeQuestionIndex==index&&'bg-green-200 font-bold text-blue-500'}`}> {index+1} .Question</h2>
                
            ))}

        </div>
            <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
           
            <Volume2 onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
              <h2 className='flex gap-2 items-center text-blue-700'>
              <Lightbulb/>
              <strong>Note:</strong>
              </h2>
              <h2>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
    </div>
  )
}

export default QuestionsSection