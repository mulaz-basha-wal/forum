import { useFormik } from "formik";
import useLocalStorage from "use-local-storage";
import { useContext } from "react";
import ForumContext from "./ForumContext";

export default function ForumForm() {
    const forumReducerValues = useContext(ForumContext);
    const [posts, setPosts] = useLocalStorage("users", "");
    const formik = useFormik({
        initialValues: {
            title: "",
            desc: "",
        },
        onSubmit(values) {
            let post = {
                title: values.title,
                desc: values.desc,
                date: Date.now(),
                user: document.querySelector(".userSelect").value,
            };
            if (posts === undefined) setPosts([post]);
            else setPosts([...posts, post]);
            forumReducerValues.dispatch({ type: "add", post: post });
        },
        validate() {
            const errors = {};
            if (formik.values.desc.length < 5) {
                errors.desc = "Description should be atleast 5 chars";
            }
            if (formik.values.title.length < 5) {
                errors.title = "Title should be atleast 5 chars";
            }
            return errors;
        },
    });
    return (
        <div className="forumForm">
            <h1 className="center">Forum Form </h1>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div>
                    <input
                        type="text"
                        name="title"
                        className="postTitle"
                        placeholder="Post Title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <p className="validationError">
                        {formik.errors.title ? formik.errors.title : null}
                    </p>
                </div>
                <div>
                    <textarea
                        className="postDescription"
                        placeholder="Please describe your post..."
                        name="desc"
                        value={formik.values.desc}
                        onChange={formik.handleChange}
                    />
                    <p className="validationError">
                        {formik.errors.desc ? formik.errors.desc : null}
                    </p>
                </div>
                <div>
                    <select name="user" className="userSelect">
                        <option value="Anonymous">Anonymous</option>
                        <option value="User 1">User 1</option>
                        <option value="User 2">User 2</option>
                        <option value="User 3">User 3</option>
                        <option value="User 4">User 4</option>
                    </select>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
