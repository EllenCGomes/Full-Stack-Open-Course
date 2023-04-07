const Blog = ({ blog }) => (
    <div style={{ marginBottom: "5px" }}>
        {blog.title} - {blog.author}
    </div>
)

export default Blog