"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/helper";
import { useEffect, useState } from "react";

const EditTaskDialog = ({ isOpen, onClose, onEditTask, task }) => {
  const [title, setTitle] = useState(task.title);
  const [taskStatus, setTaskStatus] = useState(task.taskStatus);

  useEffect(() => {
    setTitle(task.title);
    setTaskStatus(task.taskStatus);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditTask(title, taskStatus);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update Task Details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taskStatus">Task Status</Label>
            <Select
              name="taskStatus"
              required
              onValueChange={(value) => {
                setTaskStatus(value);
              }}
              defaultValue={task.taskStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    task
                      ? capitalizeFirstLetter(task.taskStatus)
                      : "Task Status"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="doing">Doing</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Update Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
