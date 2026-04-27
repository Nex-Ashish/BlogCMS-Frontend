import FiltersBar from "../../../../components/admin/posts/FiltersBar";
import PostsHeader from "../../../../components/admin/posts/PostsHeader";
import PostsTable from "../../../../components/admin/posts/PostsTable";

export default function PostsPage() {
  return (
    <div className="p-6 space-y-6">
      <PostsHeader />
      <FiltersBar />
      <PostsTable />
    </div>
  );
}