import { PutCommand, ScanCommand, DeleteCommand, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { documentClient } from "../db/dynamoClientProvider";

const TableName = String(process.env.DYNAMODB_TASKS_TABLE);


export const createTaskData = async (values: Record<string, any>) => {
  const response = await documentClient.send(
    new PutCommand({
      TableName: TableName,
      Item: values,
    })
  );
  return response;
};

export const getTaskByAuthorId = async (author_id: string) => {
    const response = await documentClient.send(
      new ScanCommand({
        TableName: TableName,
        FilterExpression: "author_id = :author_id",
        ExpressionAttributeValues: {
          ":author_id": author_id,
        },
      })
    );
    console.log(response);
  
    return response.Items; 
  };
  export const getTaskById  =async (id:string, author_id: string) => {
    const response = await documentClient.send(
        new ScanCommand({
          TableName: TableName,
          FilterExpression: "id = :id AND author_id = :author_id",
      ExpressionAttributeValues: {
        ":id": id,
        ":author_id": author_id,
      },
        })
      );
      
  return response.Items;
}
export const deleteTaskById  =async (id:string) => {
    const response = await documentClient.send(
        new DeleteCommand({
          TableName: TableName,
          Key: {
            id: id
          },
          
        })
      );
  return response;
}

export const updateTaskById = async (id: string, updatedValues: Record<string, any>) => {
    try {
      // Retrieve the existing task
      const existingTask = await documentClient.send(
        new GetCommand({
          TableName: TableName,
          Key: {
            id: id
          }
        })
      );
  
      if (!existingTask.Item) {
        // Task not found
        return null;
      }
  
      // Modify the task data with the updated values
      const updatedTask = {
        ...existingTask.Item,
        ...updatedValues
      };
  
      // Save the updated task back to DynamoDB
      const response = await documentClient.send(
        new UpdateCommand({
          TableName: TableName,
          Key: {
            id: id
          },
          UpdateExpression: "SET #title = :title, #description = :description, #due_date = :due_date",
          ExpressionAttributeNames: {
            "#title": "title",
            "#description": "description",
            "#due_date": "due_date"
          },
          ExpressionAttributeValues: {
            ":title": updatedTask.title,
            ":description": updatedTask.description,
            ":due_date": updatedTask.due_date
          }
        })
      );
  
      return response;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };



