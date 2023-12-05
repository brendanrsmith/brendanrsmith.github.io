import Post from "../../components/post";
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <Post title={""} date={""}>
      <div className="prose prose-indigo dark:prose-invert max-w-prose pb-10">
        {children}
      </div>
    </Post>
  );
}
