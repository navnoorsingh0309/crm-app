import config_appwrite from "@/config/config";
import { database } from "./config";
import { ID, Models, Query } from "node-appwrite";

interface Json {
  [key: string]: any;
}
interface LeadItem {
  Name: string;
  Company: string;
  Title: string;
  Email: string;
  Phone_Number: string;
  Address: string;
}

function leadsToJson(documents: Models.Document[]) {
  var jsonLeads: Json = {};
  documents.forEach((doc) => {
    jsonLeads[doc["Name"]] = {
      Id: doc.$id,
      Company: doc["Company"],
      Title: doc["Title"],
      Email: doc["Email"],
      Phone_Number: doc["Phone_Number"],
      Address: doc["Address"],
    };
  });
  return jsonLeads;
}

let collectionId = "";

class leads_methods {
  static async getLeadsId(id: string) {
    try {
      var response = await database.listCollections(
        config_appwrite.appWriteDatabaseId,
        [Query.equal("name", id)]
      );
      if (response.total > 0) {
        collectionId = response.collections[0].$id;
        return response.collections[0].$id;
      } else {
        // Create collection
        let col_id = ID.unique();
        database.createCollection(config_appwrite.appWriteDatabaseId, col_id, id). then(async ()=> {

        // Creating attributes
        database.createStringAttribute(config_appwrite.appWriteDatabaseId, col_id, "Name", 1000, true);
        database.createStringAttribute(config_appwrite.appWriteDatabaseId, col_id, "Company", 1000, true);
        database.createStringAttribute(config_appwrite.appWriteDatabaseId, col_id, "Title", 1000, true);
        database.createEmailAttribute(config_appwrite.appWriteDatabaseId, col_id, "Email", true);
        database.createStringAttribute(config_appwrite.appWriteDatabaseId, col_id, "Phone_Number", 1000, true);
        database.createStringAttribute(config_appwrite.appWriteDatabaseId, col_id, "Address", 1000, true); });
        return col_id;
      }
    } catch (e) {
      return "Error";
    }
  }
  static async getLeads(id: string) {
    const colId = await this.getLeadsId(id);
    if (colId?.length! > 0) {
      var lead_documents = await database.listDocuments(
        config_appwrite.appWriteDatabaseId,
        colId!
      );
      if (lead_documents.total > 0) {
        const jsonLeads = leadsToJson(lead_documents.documents);
        return jsonLeads;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  static async write_lead(
    id: string,
    { Name, Company, Title, Email, Phone_Number, Address }: LeadItem
  ) {
    const colId = await this.getLeadsId(id);
    try {
      if (colId?.length! > 0) {
        var writeDoc = await database.createDocument(
          config_appwrite.appWriteDatabaseId,
          colId!,
          ID.unique(),
          {
            Email,
            Company,
            Title,
            Address,
            Name,
            Phone_Number
          }
        );
        return "Done";
      } else {
        return "Error";
      }
    } catch (e) {
      return "Error";
    }
  }

  static async deleteLead(id: string, doc_id: string) {
    if (doc_id === "initial") {
      return "Error"
    }
    const colId = await this.getLeadsId(id);
    try {
      if (colId?.length! > 0) {
        await database.deleteDocument(
          config_appwrite.appWriteDatabaseId,
          colId!,
          doc_id
        );
        return "Done"
      } else {
        return "Error";
      }
    } catch(e) {
      return "Error";
    }

  }
}

export default leads_methods;
