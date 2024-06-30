import { database } from '@/appwrite/config';
import config_appwrite from '@/config/config';
import { Query } from 'node-appwrite';
import { Models } from 'node-appwrite';

interface Json {
    [key: string]: any;
  }

function leadsToJson(documents: Models.Document[]) {
    var jsonLeads:Json = {
        
    };
    documents.forEach(doc => {
        jsonLeads[doc['Name']] = {
            Company: doc['Company'],
            Title: doc['Title'],
            Email: doc['Email'],
            Phone_Number: doc['Phone-Number'],
            Address: doc['Address']
        };
    });
    return jsonLeads;
}

class read_leads {

    static async getLeads(id: string) {
        try {
            // Reading documents of the current user
            var response = await database.listCollections(config_appwrite.appWriteDatabaseId, [
                Query.equal('name', id)
            ]
            );
            if (response.total > 0) {
                var lead_documents = await database.listDocuments(config_appwrite.appWriteDatabaseId, response.collections[0].$id);
                if (lead_documents.total >0) {
                    const jsonLeads = leadsToJson(lead_documents.documents);
                    return jsonLeads;
                } else {
                    throw new Error("An unexpected error occured");
                }
            } else {
                throw new Error("An unexpected error occured");
            }
        } catch (e) {
            console.error("Error in getting activities: ", e);
            throw e;
        }
    }
}

export default read_leads;