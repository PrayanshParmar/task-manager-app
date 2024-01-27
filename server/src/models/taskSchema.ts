import mongoose from 'mongoose';

// Task Config
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  author_id: {type: mongoose.Schema.Types.ObjectId , ref: 'user', required: true}
  
}
,{timestamps: true});

export const TaskModel = mongoose.model('Task', TaskSchema);

interface updateTaskByIdProps{
  title?: string,
  description?: string,
  due_date?: string,
}

// Task Actions
export const getTaskById = (_id: string, author_id: string) => TaskModel.findOne({_id, author_id});
export const getTaskByTitle = (title: string) => TaskModel.find({title});
export const getTaskByAuthorId = (author_id: string) => TaskModel.find({author_id});
export const createTaskData = (values: Record<string, any>) => new TaskModel(values).save().then((task) => task.toObject());
export const updateTaskById =(_id: string,update:updateTaskByIdProps) => TaskModel.findByIdAndUpdate(_id, update,{ new: true });
export const deleteTaskById =  (_id: string,) => TaskModel.findByIdAndDelete(_id);