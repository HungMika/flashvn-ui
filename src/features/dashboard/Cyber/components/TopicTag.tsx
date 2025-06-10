import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import pencilImg from "../../../../../public/icons8-pencil-100.png"
import recycleBinImg from "../../../../../public/icons8-recycle-bin-100.png"
import { useEffect, useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { deleteTopic, editTopic } from "../api/topics";


type TopicTagProps = {
  id: string;
  ordinalNumber: string,
  topicName: string;
  triggerRefresh: () => void;
};

export default function TopicTag({id, ordinalNumber, topicName, triggerRefresh} : TopicTagProps){
  const [editConfirm, setEditConfirm] = useState(false);
  const [newName, setNewName] = useState(topicName);
  async function onEditConfirmed(id: string, newName: string){
  try {
    const res = await editTopic(id, newName);
    alert(res.message);
    triggerRefresh();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to edit topic');
  }
};
  function OnEditConfirmDialogClose(confirm: boolean){
    if(confirm){
      onEditConfirmed(id, newName);
    }
    setEditConfirm(false);
  }
  async function OnDeleteConfirmed(){
    try {
    const res = await deleteTopic(id);
    alert(res.message);
    triggerRefresh();
    } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to delete topic');
    }
  }
    return(
        <div className="flex flex-row min-h-15 min-w-2/5 rounded-xl bg-gray-100 shadow-lg">
            <div className="flex min-h-full min-w-4/5 items-center">
              <label className="ml-5 text-xl text-wrap">
                {topicName}
              </label>
            </div>
            <div className="flex flex-row gap-5 items-center justify-center min-h-full min-w-1/5">
              <Dialog onOpenChange={(open) => setNewName(topicName)}>
                <DialogTrigger asChild>
                    <button className="flex items-center justify-center min-w-1/5 min-h-1/5 bg-gray-100 cursor-pointer">
                        <img src={pencilImg.src} className="w-5 h-5"/>
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit topic</DialogTitle>
                        <DialogDescription>Update the topic name</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-6">
                      <div>
                        <label className="block text-sm font-medium">Topic name</label>
                        <input type="text" className="w-full border px-3 py-2 rounded mt-1" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                      </div>
                      <div className="flex justify-end gap-4 pt-4">
                          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer" onClick={()=>setEditConfirm(true)}>Save</button>
                          <ConfirmDialog 
                            open={editConfirm} 
                            title={'Edit confirmation'}
                            description={'Are you sure you want to change this topic name ? The topic name of all the quizes belong to this topic will be changed to newly edited name.'}
                            onClose={(result)=>OnEditConfirmDialogClose(result)}
                          >
                          </ConfirmDialog>
                          <DialogClose asChild>
                            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">Cancel</button>
                          </DialogClose>
                      </div>
                    </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center justify-center min-w-1/5 min-h-1/5 bg-gray-100 cursor-pointer">
                      <img src={recycleBinImg.src} className="w-5 h-5"/>
                    </button>
                </DialogTrigger>
                <DialogContent className="min-h-1/5 min-w-1/5">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Delete Confirmation</DialogTitle>
                    <DialogDescription className="text-sm text-gray-700">Are you sure you want to remove this topic?</DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-4 mt-6">
                    <DialogClose asChild>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" onClick={OnDeleteConfirmed}>
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