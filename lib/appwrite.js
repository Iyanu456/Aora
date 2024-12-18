import { Account, Avatars, Databases, ID, Query } from "react-native-appwrite";
import { Client } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.iyanu.aora",
  projectId: "67202924003e591e4e0c",
  databaseId: "67202ac50001d083d636",
  userCollectionId: "67202aef0010bb39b278",
  videoCollectionId: "67202b2200229be126a2",
  storageId: "67202c9c0024d201e077",
};

// Init your React Native SDK
const client = new Client();
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = config;


client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

/*const email = 'oyerindei13@gmail.com'
const password = '12345678'
const name = 'iyanu oyerinde'
const username = 'iyanu'*/

export const createUser = async (email, password, username) => {
    try {
      const newAccount = await account.create(ID.unique(), email, password, username);
      if (!newAccount) throw new Error('Account creation failed');
  
      const avatarUrl = avatars.getInitials(username);
      
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          username,
          avatar: avatarUrl
        }
      );
  
      return newUser;
  
    } catch (err) {
      console.error('Error creating user:', err.message);  // Log error message
      throw err;  // Throw existing error without nesting
    }
  };
  

export const signIn =  async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)  
    }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId, 
      config.userCollectionId, 
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
    
  } catch (error) {
    console.log(error)
  }
}


export const getAllPost = async () => {
  try {
    const post = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    )

    return post.documents;
    
  } catch (error) {
    console.log(error)
  }
}

export const getLatestAllPost = async () => {
  try {
    const post = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )

    return post.documents;
    
  } catch (error) {
    console.log(error)
  }
}

export const searchPost = async (query) => {
  try {
    const post = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)]
    )

    return post.documents;
    
  } catch (error) {
    console.log(error)
  }
}


export async function getUserPosts(userId) {
  try {
    console.log("---------------------------------------------");
    console.log(userId);
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("users", userId)]
    );

    //console.log(userId);
    console.log("post documents: ----------");
    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session
    
  } catch (error) {
    throw new Error(error)
    
  }
} 

