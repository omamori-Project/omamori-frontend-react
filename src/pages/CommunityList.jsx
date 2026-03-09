import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as communityApi from "../api/community.api";

/**
 * getPosts()가 어떤 형태로 오든(배열 / {data: 배열} / {items: 배열} 등)
 * 안전하게 "배열"만 뽑아내는 함수
 */
function pickList(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.items)) return res.items;
  if (Array.isArray(res?.posts)) return res.posts;
  return [];
}

/**
 * 백엔드 필드명이 달라도 화면이 안 터지게 최소 보정
 */
function normalizePostSafe(p) {
  const id = p?.id ?? p?.postId ?? p?._id ?? p?.post_id;
  const createdAt =
    p?.createdAt ?? p?.created_at ?? p?.createdDate ?? p?.created_date;

  return {
    id,
    title: p?.title ?? "",
    content: p?.content ?? p?.body ?? "",
    user: p?.user ?? p?.author ?? null,
    createdAt,
    liked: Boolean(p?.liked ?? p?.isLiked ?? p?.likeYn),
    bookmarked: Boolean(p?.bookmarked ?? p?.isBookmarked ?? p?.bookmarkYn),
    likeCount: p?.likeCount ?? p?.likesCount ?? p?.like_count ?? 0,
    commentCount: p?.commentCount ?? p?.commentsCount ?? p?.comment_count ?? 0,
  };
}

export default function CommunityList() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasFetchedRef = useRef(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      if (typeof communityApi.getPosts !== "function") {
        throw new Error(
          "community.api.js에 getPosts 함수가 없습니다. export 상태를 확인하세요."
        );
      }

      const res = await communityApi.getPosts(1, 20, "latest");
      const list = pickList(res).map(normalizePostSafe);
      setPosts(list);
    } catch (error) {
      console.error("게시글 목록 조회 실패:", error);
      setPosts([]); // 화면이 안 터지게
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchPosts();
  }, []);

  // ❤️ 좋아요 토글
  const toggleLike = async (post) => {
    try {
      const likeFn = post.liked ? communityApi.unlikePost : communityApi.likePost;
      if (typeof likeFn !== "function") {
        throw new Error("likePost/unlikePost 함수 export를 확인하세요.");
      }
      await likeFn(post.id);
      await fetchPosts();
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  // 🔖 북마크 토글
  const toggleBookmark = async (post) => {
    try {
      const bmFn = post.bookmarked
        ? communityApi.unbookmarkPost
        : communityApi.bookmarkPost;

      if (typeof bmFn !== "function") {
        throw new Error("bookmarkPost/unbookmarkPost 함수 export를 확인하세요.");
      }

      await bmFn(post.id);
      await fetchPosts();
    } catch (error) {
      console.error("북마크 처리 실패:", error);
      alert("북마크 처리에 실패했습니다.");
    }
  };

  // ✅ 글 작성 제출
  const onSubmitPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    try {
      if (typeof communityApi.createPost !== "function") {
        throw new Error("createPost 함수 export를 확인하세요.");
      }

      setSubmitting(true);
      await communityApi.createPost({
        title: title.trim(),
        content: content.trim(),
      });

      setTitle("");
      setContent("");
      setIsWriting(false);
      await fetchPosts();
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>커뮤니티</h1>
        <button onClick={() => setIsWriting((v) => !v)}>
          {isWriting ? "닫기" : "글쓰기"}
        </button>
      </div>

      {isWriting && (
        <div
          style={{
            marginBottom: 20,
            padding: 15,
            border: "1px solid #ddd",
            borderRadius: 10,
            backgroundColor: "#f9f9f9",
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              style={{
                width: "100%",
                padding: 10,
                boxSizing: "border-box",
                borderRadius: 5,
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요..."
              rows={4}
              style={{
                width: "100%",
                padding: 10,
                boxSizing: "border-box",
                borderRadius: 5,
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
          </div>
          <button
            onClick={onSubmitPost}
            disabled={submitting}
            style={{ padding: "8px 16px" }}
          >
            {submitting ? "저장 중..." : "저장"}
          </button>
        </div>
      )}

      {loading ? (
        <p>불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/community/${post.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              marginBottom: 12,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <h3 style={{ margin: "0 0 8px" }}>{post.title}</h3>
            <p style={{ margin: "0 0 8px", color: "#333" }}>{post.content}</p>

            <p style={{ margin: "0 0 10px", color: "gray", fontSize: 13 }}>
              작성자: {post.user?.name ?? post.user?.nickname ?? "알 수 없음"} |{" "}
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "-"}
            </p>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(post);
                }}
                style={{
                  padding: "5px 10px",
                  borderRadius: 5,
                  border: "1px solid #ddd",
                  background: post.liked ? "#fff0f0" : "#fff",
                }}
              >
                {post.liked ? "💖" : "🤍"} 좋아요 {post.likeCount}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(post);
                }}
                style={{
                  padding: "5px 10px",
                  borderRadius: 5,
                  border: "1px solid #ddd",
                  background: post.bookmarked ? "#f0f7ff" : "#fff",
                }}
              >
                {post.bookmarked ? "🔖 북마크됨" : "📌 북마크"}
              </button>

              <span style={{ color: "gray", fontSize: 13 }}>
                💬 {post.commentCount}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}