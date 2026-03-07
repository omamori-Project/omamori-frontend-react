import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommunityList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // 🟢 목데이터
    const mockData = [
      {
        id: 1,
        title: "첫 오마모리 완성!",
        content: "시험 합격 기원합니다 🙏",
        user: { id: 5, name: "ㅇㅇ" },
        likeCount: 3,
        commentCount: 2,
        bookmarked: false,
        liked: false,
      },
      {
        id: 2,
        title: "취업 성공하고 싶어요",
        content: "올해는 꼭 취뽀…",
        user: { id: 6, name: "유저2" },
        likeCount: 5,
        commentCount: 1,
        bookmarked: true,
        liked: true,
      },
    ];

    setPosts(mockData);
  };

  // ❤️ 좋아요 토글 (POST/DELETE /posts/:post/likes)
  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const nextLiked = !p.liked;
        return {
          ...p,
          liked: nextLiked,
          likeCount: nextLiked ? p.likeCount + 1 : Math.max(0, p.likeCount - 1),
        };
      })
    );
  };

  // 🔖 북마크 토글 (POST/DELETE /posts/:post/bookmarks)
  const toggleBookmark = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>커뮤니티</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/community/${post.id}`)}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 12,
            cursor: "pointer",
          }}
        >
          <h3 style={{ margin: "0 0 8px" }}>{post.title}</h3>
          <p style={{ margin: "0 0 8px" }}>{post.content}</p>
          <p style={{ margin: "0 0 10px", color: "gray" }}>
            작성자: {post.user?.name}
          </p>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* 버튼 클릭이 카드 클릭(상세 이동)까지 같이 안 되게 stopPropagation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(post.id);
              }}
            >
              {post.liked ? "💖" : "🤍"} 좋아요 {post.likeCount}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(post.id);
              }}
            >
              {post.bookmarked ? "🔖 북마크됨" : "📌 북마크"}
            </button>

            <span style={{ color: "gray" }}>💬 {post.commentCount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}