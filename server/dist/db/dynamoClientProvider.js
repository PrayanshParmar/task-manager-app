"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
require("dotenv/config");
const dbClient = new client_dynamodb_1.DynamoDBClient({ region: "ap-south-1", credentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY),
        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    } });
const marshallOptions = {};
const unmarshallOptions = {};
const translateConfig = { marshallOptions, unmarshallOptions };
exports.documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dbClient, translateConfig);
