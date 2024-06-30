import { database } from "@/appwrite/config";
import config_appwrite from "@/config/config";
import { Query } from "node-appwrite";

class read_activities {
  static async getActivities(id: string) {
    try {
      // Reading documents of the current user
      var response = await database.listDocuments(
        config_appwrite.appWriteDatabaseId,
        config_appwrite.appWriteActivitiesCollectionId,
        [Query.equal("user_id", id)]
      );
      if (response.total > 0) {
        return [
          response.documents[0]["activities"][0],
          response.documents[0]["activities"][1],
          response.documents[0]["activities"][2],
        ];
      } else {
        throw new Error("An unexpected error occured");
      }
    } catch (e) {
      console.error("Error in getting activities: ", e);
      throw e;
    }
  }
}

export default read_activities;
