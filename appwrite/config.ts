import config_appwrite from "@/config/config";
import { Client, Databases } from "node-appwrite";


const client = new Client()
  .setEndpoint(config_appwrite.appWriteUrl)
  .setProject(config_appwrite.appWriteProjectId)
  .setKey(config_appwrite.appWriteApiKey);

const database = new Databases(client);

export { client, database };
