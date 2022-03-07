export default function ForumItem(props) {
    const post = props.post;
    const dispatch = props.dispatch;
    const onRemove = () => {
        if (window.confirm("Press a button!\nEither OK or Cancel.")) {
            dispatch({ type: "remove", date: post.date });
        }
    };
    return (
        <div className="forumItem">
            <div className="postActions">
                <div className="userTime">
                    <p className="user">{post.user}</p>
                    <p className="postDate">
                        {new Date(post.date).toISOString()}
                    </p>
                </div>
                <button className="removeButton" onClick={onRemove}>
                    X
                </button>
            </div>
            <h3 className="title">{post.title}</h3>
            <p className="desc">{post.desc}</p>
        </div>
    );
}
