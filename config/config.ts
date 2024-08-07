const config_appwrite = {
    appWriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appWriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appWriteApiKey: String(process.env.NEXT_SECRET_APPWRITE_API_KEY),
    appWriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appWriteActivitiesCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ACTIVITIES_COLLECTION_ID),
    appWriteAccDenProgCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ACCDENPROG_COLLECTION_ID),
}

export default config_appwrite;