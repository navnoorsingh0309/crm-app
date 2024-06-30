import { database } from "@/appwrite/config";
import config_appwrite from "@/config/config";
import { Query } from "node-appwrite";

class read_accdenprog {
  static async getAccDenProg(id: string) {
    try {
      // Reading documents of the current user
      var response = await database.listDocuments(
        config_appwrite.appWriteDatabaseId,
        config_appwrite.appWriteAccDenProgCollectionId,
        [Query.equal("user_id", id)]
      );
      if (response.total > 0) {
        return [
          response.documents[0]["details"][0],
          response.documents[0]["details"][1],
          response.documents[0]["details"][2],
        ];
      } else {
        throw new Error("An unexpected error occured");
      }
    } catch (e) {
      console.error("Error in getting details: ", e);
      throw e;
    }
  }
}

export default read_accdenprog;
