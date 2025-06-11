"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateInterviewQA } from "@/utils/GeminiAIModal"; // ✅ updated import
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";



function AddNewInterview() {
  const [openDialog, setopenDialog] = useState(false);
  const [jobPosition, setjobPosition] = useState("");
  const [jobDesc, setjobDesc] = useState("");
  const [jobExperience, setjobExperience] = useState("");
  const [loading, setloading] = useState(false);
  const [jsonResponse, setjsonResponse] = useState([]);
  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
  e.preventDefault();
  setloading(true);

  try {
    const result = await generateInterviewQA({
      jobPosition,
      jobDesc,
      jobExperience,
    });

    // If result is a string with ```json ... ```
    const rawText = typeof result === "string"
      ? result
      : (await result.text?.()) || "";

    const cleanText = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanText);

    console.log("Parsed Interview Questions:", parsed);
    if(Array.isArray(parsed) && parsed.every(q => q.question && q.answer)){
  
      const resp=await db.insert(MockInterview)
      .values({
        mockID:uuidv4(),
        jsonMockResp:JSON.stringify(parsed),
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss')
      }).returning({mockId:MockInterview.mockID});
      
      console.log("Inserted ID:", resp)
      if(resp){
        setopenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId);
      }
    }
    else{
      console.log("No Interview Questions Generated");
    }
    
    setjsonResponse(parsed);
  } catch (error) {
    console.error("Error generating interview questions:", error);
  }


  
  setloading(false);
};


  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setopenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, Job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-4">
                    <label className="m-2 py-2">Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) =>
                        setjobPosition(event.target.value)
                      }
                    />
                  </div>
                  <div className="my-4">
                    <label className="m-2 py-4">
                      Job Description/ Tech Stack (In Short)
                    </label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs etc."
                      required
                      onChange={(event) => setjobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="m-2 py-4">Years of Experience</label>
                    <Input
                      placeholder="Ex. 2"
                      type="number"
                      required
                      onChange={(event) =>
                        setjobExperience(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    className="cursor-pointer"
                    variant="ghost"
                    onClick={() => setopenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                  {loading? 
                  <>
                  <LoaderCircle className="animate-spin"/>Generating from AI
                  </>:'Start Interview'
                  }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
