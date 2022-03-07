import { useContext, useEffect } from "react";
import ForumContext from "./ForumContext";
import ForumItem from "./ForumItem";
import useLocalStorage from "use-local-storage";
export default function ForumList() {
    const { state, dispatch } = useContext(ForumContext);
    const [posts, setPosts] = useLocalStorage("users", "");
    useEffect(() => {
        dispatch({ type: "loadPosts", posts: posts });
    }, []);
    const del5Mins = () => {
        dispatch({ type: "del5mins" });
    };
    return (
        <div className="forumList">
            <div className="head">
                <h1 className="listtitle">Forum List</h1>
                <button className="clear5mins" onClick={del5Mins}>
                    Delete 5 Mins
                </button>
            </div>
            <div>
                {state.posts.length !== 0 ? (
                    state.posts.map((post) => {
                        return (
                            <ForumItem
                                post={post}
                                key={post.date}
                                dispatch={dispatch}
                            />
                        );
                    })
                ) : (
                    <h1 className="center">No posts Available</h1>
                )}
            </div>
        </div>
    );
}
