import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; 
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import 'dotenv/config';

const dbClient = new DynamoDBClient({ region: "ap-south-1", credentials:{
    accessKeyId: String(process.env.AWS_ACCESS_KEY) ,
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
}})

export interface marshallOptions {
    
    convertEmptyValues?: boolean;
    
    removeUndefinedValues?: boolean;
    
    convertClassInstanceToMap?: boolean;
    
    convertTopLevelContainer?: boolean;
  }
  
  export interface unmarshallOptions {
   
    wrapNumbers?: boolean;
  

    convertWithoutMapWrapper?: boolean;
  }
  
  const marshallOptions: marshallOptions = {};
  const unmarshallOptions: unmarshallOptions = {};
  
  const translateConfig = { marshallOptions, unmarshallOptions };

export const documentClient  = DynamoDBDocumentClient.from(dbClient, translateConfig);

