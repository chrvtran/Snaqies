import React from "react";
import PostDisplayScreen from "./PostDisplayScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DraftsScreen({ navigation }) {
    const validPostCallback = ([key, post]) => {
        return post !== null && post.date !== undefined && !post.published;
    }

    const getDraftPosts = async () => {
        try {
            const postKeys = await AsyncStorage.getAllKeys();
            const storedPosts = await AsyncStorage.multiGet(postKeys);

            if (storedPosts !== null) {
                postObjs = storedPosts.map((val) => [val[0], JSON.parse(val[1])]);
                const drafts = postObjs.filter(validPostCallback);
                
                // Sort the drafts in order of most recent
                const sortedDrafts = drafts.sort((a, b) => {
                    const dateA = new Date(a[1].date).getTime();
                    const dateB = new Date(b[1].date).getTime();
                    return dateB - dateA;
                });

                return sortedDrafts;
            }
        } catch(e) {
            console.error(e);
        }
    }
    return (
        <PostDisplayScreen navigation={navigation} getData={getDraftPosts}/>
    );
}

export default DraftsScreen;