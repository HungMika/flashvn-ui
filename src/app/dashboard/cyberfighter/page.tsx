'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QuestionTag from "@/features/dashboard/Cyber/components/QuestionTag";
import { getQuestions } from "@/features/dashboard/Cyber/api/question"; 
import { useEffect, useState } from "react";

type Question = {
  _id: string;
  topic: string;
  question: string;
  answers: string[];
  rightAnswer: string
}

export default function CyberDashboardPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  useEffect(()=>{
    const fetchQuestions = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };
    fetchQuestions();
  }, [])
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="min-h-10 min-w-full mt-15 font-bold text-5xl text-center" style={{color: "#5202ba"}}>
        Cyberfighter Quizes
      </div>
      <div className="mt-15 min-h-150 max-h-150 min-w-9/10 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-4">
          {questions.map((aQuestion, index)=>(
            <QuestionTag key={aQuestion._id} id={aQuestion._id} ordinalNumber={(index + 1).toString()} topic={aQuestion.topic} question={aQuestion.question} answers={aQuestion.answers} rightAnswer={aQuestion.rightAnswer}></QuestionTag>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-10 min-h-15 min-w-full">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex flex-row items-center justify-center min-h-15 min-w-60 rounded-3xl cursor-pointer" style={{backgroundColor: "#5202ba"}}>
              <label className="font-semibold text-xl text-white cursor-pointer">Add new quiz</label>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new quiz</DialogTitle>
              <DialogDescription>Fill a new quiz information and click Confirm to add a new quiz</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium">Question</label>
                <input type="text" className="w-full border px-3 py-2 rounded mt-1"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium">Answers</label>
                  {["A", "B", "C", "D"].map((letter, index) => (
                    <div key={letter} className="flex items-center gap-2">
                      <span className="w-5">{letter}.</span>
                      <input
                        type="text"
                        className="flex-1 border px-3 py-2 rounded"
                      />
                    </div>
                  ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Right Answer</label>
                <div className="flex gap-3">
                  {["A", "B", "C", "D"].map((opt) => (
                    <button
                      key={opt}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-green-500 hover:text-white hover:border-green-600 transition cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">Save</button>
                <DialogClose asChild>
                  <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">Cancel</button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
