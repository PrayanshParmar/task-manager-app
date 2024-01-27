"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskById = exports.deleteTaskById = exports.getTaskById = exports.getTaskByAuthorId = exports.createTaskData = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamoClientProvider_1 = require("../db/dynamoClientProvider");
const TableName = "tasks";
const createTaskData = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dynamoClientProvider_1.documentClient.send(new lib_dynamodb_1.PutCommand({
        TableName: TableName,
        Item: values,
    }));
    return response;
});
exports.createTaskData = createTaskData;
const getTaskByAuthorId = (author_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dynamoClientProvider_1.documentClient.send(new lib_dynamodb_1.ScanCommand({
        TableName: TableName,
        FilterExpression: "author_id = :author_id",
        ExpressionAttributeValues: {
            ":author_id": author_id,
        },
    }));
    console.log(response);
    return response.Items;
});
exports.getTaskByAuthorId = getTaskByAuthorId;
const getTaskById = (id, author_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dynamoClientProvider_1.documentClient.send(new lib_dynamodb_1.ScanCommand({
        TableName: TableName,
        FilterExpression: "id = :id AND author_id = :author_id",
        ExpressionAttributeValues: {
            ":id": id,
            ":author_id": author_id,
        },
    }));
    return response.Items;
});
exports.getTaskById = getTaskById;
const deleteTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dynamoClientProvider_1.documentClient.send(new lib_dynamodb_1.DeleteCommand({
        TableName: TableName,
        Key: {
            id: id
        },
    }));
    return response;
});
exports.deleteTaskById = deleteTaskById;
const updateTaskById = (id, updatedValues) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve the existing task
        const existingTask = yield dynamoClientProvider_1.documentClient.send(new lib_dynamodb_1.GetCommand({
            TableName: TableName,
            Key: {
                id: id
            }
        }));
        if (!existingTask.Item) {
            // Task not found
            return null;
        }
        // Modify the task data with the updated values
        const updatedTask = Object.assign(Object.assign({}, existingTask.Item), updatedValues);
        // Save the updated task back to DynamoDB
        const response = yield dynamoClientProvider_1.documentClient.send(new lib_dynamodb_1.UpdateCommand({
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
        }));
        return response;
    }
    catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
});
exports.updateTaskById = updateTaskById;
