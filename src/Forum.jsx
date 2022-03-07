import useLocalStorage from "use-local-storage";
import ForumForm from "./ForumForm";
import ForumList from "./ForumList";
import ForumContext from "./ForumContext";
import { useReducer } from "react";
export default function Forum() {
    const [posts, setPosts] = useLocalStorage("users", "");
    const initialValue = { posts: [] };
    const ForumReducer = (state, action) => {
        if (action.type === "add") {
            return { posts: [...state.posts, action.post] };
        }
        if (action.type === "remove") {
            let updatedPosts = [];
            state.posts.forEach((post) => {
                if (post.date !== action.date) {
                    updatedPosts.push(post);
                }
            });
            setPosts([...updatedPosts]);
            return { posts: updatedPosts };
        }
        if (action.type === "loadPosts") {
            return { posts: action.posts };
        }
        if (action.type === "del5mins") {
            let olderPosts = [];
            state.posts.forEach((post) => {
                if (Date.now() - post.date > 300000) {
                    olderPosts.push(post);
                }
            });
            setPosts([...olderPosts]);
            return { posts: olderPosts };
        }
        if (action.type === "del5mins") {
            setPosts([]);
            return { posts: [] };
        }
    };
    const [state, dispatch] = useReducer(ForumReducer, initialValue);
    const reducerValue = { state, dispatch };
    return (
        <div className="forum">
            <ForumContext.Provider value={reducerValue}>
                <ForumList />
                <ForumForm />
            </ForumContext.Provider>
        </div>
    );
}
