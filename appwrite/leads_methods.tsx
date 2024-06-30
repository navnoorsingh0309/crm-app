import config_appwrite from "@/config/config";
import { database } from "./config";
import { ID, Models, Query } from "node-appwrite";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
      }
    } catch (e) {
      console.error("Error in getting activities: ", e);
      throw e;
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
        throw new Error("An unexpected error occured");
      }
    } else {
      throw new Error("An unexpected error occured");
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
        return "Not found";
      }
    } catch (e) {
      return e;
      throw e;
    }
  }
}

export default leads_methods;