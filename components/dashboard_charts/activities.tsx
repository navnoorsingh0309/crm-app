import React, { useState } from 'react'
import { database } from '@/appwrite/config';
import config_appwrite from '@/config/config';
import { currentUser } from '@clerk/nextjs/server';
import { Query } from 'node-appwrite';

const Activities = async () => {
    const user = await currentUser();
    // Reading documents of the current user
    var x = await database.listDocuments(config_appwrite.appWriteDatabaseId, config_appwrite.appWriteCollectionId, [
        Query.equal('user_id', user!.id)
    ]
    );
    
  return (
    <div className="">
        
    </div>
  )
}

export default Activities;
