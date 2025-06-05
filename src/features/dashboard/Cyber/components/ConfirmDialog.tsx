// ConfirmDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  onClose: (result: boolean) => void;
};

export const ConfirmDialog = ({ open, title, description, onClose }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "Are you sure?"}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={() => onClose(true)}>Yes</Button>
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};