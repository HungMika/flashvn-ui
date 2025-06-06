'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import QuestionTag from "@/features/dashboard/Cyber/components/QuestionTag";
import { getQuestions, createQuiz, getQuizByTopic } from "@/features/dashboard/Cyber/api/question"; 
import { getTopics, createTopic } from "@/features/dashboard/Cyber/api/topics";
import { useEffect, useState } from "react";
import TopicTag from "@/features/dashboard/Cyber/components/TopicTag";

type Question = {
  _id: string;
  topic: string;
  question: string;
  answers: string[];
  rightAnswer: string
}

type Topic = {
  _id: string,
  topicName: string
}

export default function CyberDashboardPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicName, setTopicName] = useState("");
  const [selectedCreateTopic, setSelectedCreateTopic] = useState("");
  const [selectedSearchTopic, setSelectedSearchTopic] = useState("all");
  const [questionContent, setQuestionContent] = useState("");
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [rightAnswerIndex, setRightAnswerIndex] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);

  function resetCreateQuizInfo(){
    setSelectedCreateTopic("");
    setQuestionContent("");
    setAnswers(['', '', '', '']);
    setRightAnswerIndex(null);
  }
  async function onTopicDialogOpen(isOpen: boolean){
    if(isOpen === true){
      const data = await getTopics();
      setTopics(data);
    }
  }
  async function onCreateTopicClicked(){
    if (!topicName.trim()) {
      alert('Topic name is required!');
      return;
    }

    try {
      const res = await createTopic(topicName.trim());
      alert(res.message || 'Topic created!');
      setTopicName('');
      setRefresh(prev => !prev); 
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create topic');
    }
  }
  async function onCreateQuizClicked(){
    if (!selectedCreateTopic || !questionContent || rightAnswerIndex === null || answers.some(a => !a.trim())) {
      alert("Please fill all fields and select the right answer");
      return;
    }

    const payload = {
      topic: selectedCreateTopic,
      question: questionContent,
      rightAnswer: answers[rightAnswerIndex],
      answers: answers,
    };

    try {
      const res = await createQuiz(payload);
      alert("Quiz created successfully!");
      setRefresh(prev=>!prev);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create quiz');
    }
  }

  useEffect(()=>{
    const fetchQuestions = async () => {
      try{
        const data = await getQuizByTopic(selectedSearchTopic);
        setQuestions(data);
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to read quiz');
      }
    };
    const fetchTopics = async () => {
      try{
        const data = await getTopics();
        setTopics(data);
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to read topic');
      }
    }
    fetchQuestions();
    fetchTopics();
  }, [refresh])
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="min-h-10 min-w-full mt-15 font-bold text-5xl text-center" style={{color: "#5202ba"}}>
        Cyberfighter Quizes
      </div>
      <div className="flex flex-row-reverse items-center gap-4 mt-10 min-h-15 min-w-9/10 justify-between">
        <Dialog /*onOpenChange={(isOpen)=>onTopicDialogOpen(isOpen)*/>
          <DialogTrigger asChild>
            <button className="flex flex-row items-center justify-center min-h-15 min-w-40 rounded-3xl cursor-pointer" style={{backgroundColor: "#5202ba"}}>
              <label className="font-semibold text-xl text-white cursor-pointer">See topics</label>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Topics information</DialogTitle>
              <DialogDescription>You can perform Add, Update or Remove topic action with the list below</DialogDescription>
            </DialogHeader>
            <div className="min-h-70 max-h-70 min-w-3/4 overflow-y-scroll">
              <div className="grid grid-rows-1 gap-4">
                {topics.map((aTopic, index)=>(
                  <TopicTag 
                  key={aTopic._id} 
                  id={aTopic._id} 
                  ordinalNumber={(index + 1).toString()} 
                  triggerRefresh={() => setRefresh(prev => !prev)}
                  topicName={aTopic.topicName}></TopicTag>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Dialog onOpenChange={()=>setTopicName("")}>
                  <DialogTrigger asChild>
                      <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">Add new topic</button>
                  </DialogTrigger>
                  <DialogContent>
                      <DialogHeader>
                          <DialogTitle>Create topic</DialogTitle>
                          <DialogDescription>Add a new topic</DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block text-sm font-medium">Topic name</label>
                          <input 
                          type="text" 
                          value={topicName}
                          onChange={(e) => setTopicName(e.target.value)}
                          className="w-full border px-3 py-2 rounded mt-1"/>
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                          <DialogClose asChild>
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer" onClick={onCreateTopicClicked}>Save</button>
                          </DialogClose>
                          <DialogClose asChild>
                            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">Cancel</button>
                          </DialogClose>
                        </div>
                      </div>
                  </DialogContent>
                </Dialog>
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex flex-row items-center gap-2">
          <Select value={selectedSearchTopic} onValueChange={setSelectedSearchTopic}>
            <SelectTrigger className="min-w-60 h-12">
              <SelectValue placeholder="-- All Topics --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">-- All Topics --</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic._id} value={topic.topicName}>
                  {topic.topicName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            className="h-12 px-6 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition"
            onClick={() => setRefresh(prev=>!prev)}
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-10 min-h-150 max-h-150 min-w-9/10 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-4">
          {questions.map((aQuestion, index)=>(
            <QuestionTag 
            key={aQuestion._id} id={aQuestion._id} 
            ordinalNumber={(index + 1).toString()} 
            topic={aQuestion.topic} 
            question={aQuestion.question} 
            answers={aQuestion.answers} 
            rightAnswer={aQuestion.rightAnswer}
            triggerRefresh={()=>setRefresh(prev=>!prev)}
            >
            </QuestionTag>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-10 min-h-15 min-w-full">
        <Dialog onOpenChange={()=>{
          resetCreateQuizInfo();
        }}>
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
            <div>
              <label className="block text-sm font-medium mb-1">Select Topic</label>
              <Select value={selectedCreateTopic} onValueChange={setSelectedCreateTopic}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic._id} value={topic.topicName}>
                      {topic.topicName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium">Question</label>
                <input 
                type="text" 
                className="w-full border px-3 py-2 rounded mt-1"
                value={questionContent}
                onChange={(e) => {setQuestionContent(e.target.value)}}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium">Answers</label>
                {["A", "B", "C", "D"].map((letter, index) => (
                  <div key={letter} className="flex items-center gap-2">
                    <span className="w-5">{letter}.</span>
                    <input
                      type="text"
                      className="flex-1 border px-3 py-2 rounded"
                      value={answers[index]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Right Answer</label>
                <div className="flex gap-3">
                  {["A", "B", "C", "D"].map((opt, index) => {
                    const isSelected = index === rightAnswerIndex;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setRightAnswerIndex(index)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border transition cursor-pointer
                          ${isSelected
                            ? "bg-green-500 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-green-500 hover:text-white hover:border-green-600"
                          }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <DialogClose asChild>
                  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer" onClick={onCreateQuizClicked}>Save</button>
                </DialogClose>
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
