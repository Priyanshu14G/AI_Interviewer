"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Feedback() {
  const params = useParams(); // ✅ use the hook
  const interviewId = params?.interviewId;
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);

  const GetFeedback = async () => {
    console.log("Fetching for ID:", interviewId);

    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  return (
    <div>
      <div className="p-10">
       

        {feedbackList?.length == 0? 
        <h2 className="font-bold text-xl text-gray-500">No Interview Record Feedback Record Found</h2>
        :
        <>
         <h2 className="text-2xl font-bold text-green-500">Congratulations!</h2>
        <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
        <h2 className="text-blue-600/100 dark:text-sky-400/100 text-lg my-3">
          Find your rating below
        </h2>
        <h2 className="text-sm text-gray-500">
          Find below interview question with correct answer, Your answer and
          Feedback for improvement(click on the Question to check the review)
        </h2>
        {feedbackList &&
          feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between m-2 text-left gap-7 cursor-pointer">
                {item.question}<ChevronsUpDown className="h-5 w-5"/>
                </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating:</strong>{item.rating}</h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer : </strong>{item.userAns}</h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer : </strong>{item.correctAns}</h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900"><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
      </>}
      </div>
      <div className="flex justify-center m-5 p-5">        
      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
      </div>
    </div>
  );
}

export default Feedback;
