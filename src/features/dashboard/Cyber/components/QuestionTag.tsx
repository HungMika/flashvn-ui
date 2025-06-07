import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import pencilImg from "../../../../../public/icons8-pencil-100.png"
import recycleBinImg from "../../../../../public/icons8-recycle-bin-100.png"
import { editQuiz, deleteQuiz } from "../api/question";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { getTopics } from "../api/topics";
import { Pencil, Trash2 } from "lucide-react";

type QuestionTagProps = {
  id: string;
  ordinalNumber: string,
  topic: string;
  question: string;
  answers: string[];
  rightAnswer: string;
  triggerRefresh: () => void;
};

type Topic = {
  _id: string,
  topicName: string
}

export default function QuestionTag({id, ordinalNumber, topic, question, answers, rightAnswer, triggerRefresh} : QuestionTagProps){
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswers, setEditedAnswers] = useState<string[]>(answers);
  const [editedRightAnswerIndex, setEditedRightAnswerIndex] = useState<number>(answers.indexOf(rightAnswer));

  async function onDeleteClicked(){
    try {
    const res = await deleteQuiz(id);
    alert(res.message);
    triggerRefresh();
    } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to delete quiz');
    }
  }

  async function onEditQuizClicked(){
    const payload = {
      id: id,
      topic: selectedTopic,
      question: editedQuestion.trim(),
      rightAnswer: editedAnswers[editedRightAnswerIndex],
      answers: editedAnswers.map(a => a.trim()),
    };
    try {
      const res = await editQuiz(payload);

      alert(res.message || "Quiz updated successfully!");
      triggerRefresh();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update quiz");
    }
  }

  async function onEditModalOpen(open: boolean){
    if(open){
      const data = await getTopics();
      setTopics(data);
      setSelectedTopic(topic);
      setEditedQuestion(question);
      setEditedAnswers(answers);
      setEditedRightAnswerIndex(answers.indexOf(rightAnswer))
    }
  }
    return(
        <div className="flex flex-row min-h-25 min-w-2/5 rounded-xl bg-gray-100 shadow-lg">
            <div className="flex min-h-full min-w-4/5 items-center">
              <label className="ml-5 text-xl text-wrap">
                Question {ordinalNumber}. {question}
              </label>
            </div>
            <div className="flex flex-row gap-5 items-center justify-center min-h-full min-w-1/5">
              <Dialog onOpenChange={(open)=>onEditModalOpen(open)}>
                <DialogTrigger asChild>
                    <button className="flex items-center justify-center min-w-1/5 min-h-1/5 bg-gray-100 cursor-pointer">
                        <Pencil className="w-7 h-7"/>
                    </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Quiz</DialogTitle>
                    <DialogDescription>Update the question and answers</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Topic</label>
                      <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {topics.map((t) => (
                            <SelectItem key={t._id} value={t.topicName}>
                              {t.topicName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Question */}
                    <div>
                      <label className="block text-sm font-medium">Question</label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                      />
                    </div>

                    {/* Answers */}
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium">Answers</label>
                      {["A", "B", "C", "D"].map((letter, index) => (
                        <div key={letter} className="flex items-center gap-2">
                          <span className="w-5">{letter}.</span>
                          <input
                            type="text"
                            className="flex-1 border px-3 py-2 rounded"
                            value={editedAnswers[index]}
                            onChange={(e) => {
                              const updated = [...editedAnswers];
                              updated[index] = e.target.value;
                              setEditedAnswers(updated);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Right Answer */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Right Answer</label>
                      <div className="flex gap-3">
                        {["A", "B", "C", "D"].map((opt, index) => {
                          const isSelected = index === editedRightAnswerIndex;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setEditedRightAnswerIndex(index)}
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

                    {/* Save / Cancel buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                      <DialogClose asChild>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                          onClick={onEditQuizClicked}
                        >
                          Save
                        </button>
                      </DialogClose>
                      <DialogClose asChild>
                        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
                          Cancel
                        </button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center justify-center min-w-1/5 min-h-1/5 bg-gray-100 cursor-pointer">
                      <Trash2 className="w-7 h-7"/>
                    </button>
                </DialogTrigger>
                <DialogContent className="min-h-1/5 min-w-1/5">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Delete Confirmation</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-700">
                    Are you sure you want to remove this quiz?
                  </p>
                  <div className="flex justify-end gap-4 mt-6">
                    <DialogClose asChild>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" onClick={onDeleteClicked}>
                        Delete
                      </button>
                    </DialogClose>
                    <DialogClose asChild>
                      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer">
                        Cancel
                      </button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
        </div>
    );
}