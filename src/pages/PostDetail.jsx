import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostDetail,
  getComments,
  createComment,
  createReply,
  updateComment,
  deleteComment as deleteCommentApi,
  likePost,
  unlikePost,
  bookmarkPost,
  unbookmarkPost,
  deletePost,
} from "../api/community.api";

export default function PostDetail() {
  const { id } = useParams(); // URL parameter name is id based on App.jsx routes
  const navigate = useNavigate();
  const pid = id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 댓글 상태
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [replyTarget, setReplyTarget] = useState(null);
  const [newReply, setNewReply] = useState("");

  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      const postData = await getPostDetail(pid);
      setPost(postData);

      const commentData = await getComments(pid);
      setComments(commentData.data || commentData || []);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pid) fetchPostAndComments();
  }, [pid]);

  // 댓글/답글 분리
  const topComments = useMemo(
    () => comments.filter((c) => !c.parent_id),
    [comments]
  );
  const repliesOf = (parentId) => comments.filter((c) => String(c.parent_id) === String(parentId));

  // 댓글 작성
  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await createComment(pid, { content: newComment.trim() });
      setNewComment("");
      const updatedComments = await getComments(pid);
      setComments(updatedComments.data || updatedComments || []);
      const updatedPost = await getPostDetail(pid);
      setPost(updatedPost);
    } catch (error) {
      alert("댓글 작성 실패");
    }
  };

  // 답글 작성
  const addReply = async (parentId) => {
    if (!newReply.trim()) return;
    try {
      await createReply(parentId, { content: newReply.trim() });
      setNewReply("");
      setReplyTarget(null);
      const updatedComments = await getComments(pid);
      setComments(updatedComments.data || updatedComments || []);
      const updatedPost = await getPostDetail(pid);
      setPost(updatedPost);
    } catch (error) {
      alert("답글 작성 실패");
    }
  };

  // 삭제 (댓글/답글 공용)
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteCommentApi(commentId);
      const updatedComments = await getComments(pid);
      setComments(updatedComments.data || updatedComments || []);
      const updatedPost = await getPostDetail(pid);
      setPost(updatedPost);
    } catch (error) {
      alert("삭제 실패");
    }
  };

  // 수정 저장
  const saveEdit = async () => {
    if (!editContent.trim()) return;
    try {
      await updateComment(editId, { content: editContent.trim() });
      setEditId(null);
      setEditContent("");
      const updatedComments = await getComments(pid);
      setComments(updatedComments.data || updatedComments || []);
    } catch (error) {
      alert("수정 실패");
    }
  };

  // 좋아요/북마크
  const onToggleLike = async () => {
    try {
      if (post.liked) {
        await unlikePost(pid);
      } else {
        await likePost(pid);
      }
      const updatedPost = await getPostDetail(pid);
      setPost(updatedPost);
    } catch (error) {
      alert("좋아요 처리 실패");
    }
  };

  const onToggleBookmark = async () => {
    try {
      if (post.bookmarked) {
        await unbookmarkPost(pid);
      } else {
        await bookmarkPost(pid);
      }
      const updatedPost = await getPostDetail(pid);
      setPost(updatedPost);
    } catch (error) {
      alert("북마크 처리 실패");
    }
  };

  // 게시글 삭제
  const onDeletePost = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    try {
      await deletePost(pid);
      navigate("/community");
    } catch (error) {
      alert("게시글 삭제 실패");
    }
  }

  if (loading) return <div style={{ padding: 20 }}>로딩 중...</div>;

  if (!post) {
    return (
      <div style={{ padding: 20 }}>
        <p>게시글을 찾을 수 없습니다.</p>
        <button onClick={() => navigate("/community")}>목록으로</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => navigate("/community")}>← 목록으로</button>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigate(`/community/edit/${pid}`)}>수정</button>
          <button onClick={onDeletePost} style={{ color: "red" }}>삭제</button>
        </div>
      </div>

      <h1 style={{ marginTop: 10 }}>{post.title}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
      <p style={{ color: "gray" }}>작성자: {post.user?.name}</p>

      {/* 좋아요/북마크 */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", margin: "10px 0 20px" }}>
        <button onClick={onToggleLike}>
          {post.liked ? "💖" : "🤍"} 좋아요 {post.likeCount}
        </button>
        <button onClick={onToggleBookmark}>
          {post.bookmarked ? "🔖 북마크됨" : "📌 북마크"}
        </button>
        <span style={{ color: "gray" }}>💬 {post.commentCount}</span>
      </div>

      <hr />

      <h2>댓글</h2>

      {/* 댓글 입력 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글 입력"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addComment}>등록</button>
      </div>

      {/* 댓글 목록 */}
      {topComments.length === 0 ? (
        <p style={{ color: "gray" }}>첫 댓글을 남겨보세요!</p>
      ) : (
        topComments.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            {editId === c.id ? (
              <>
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={{ padding: 6, width: "70%" }}
                />
                <button onClick={saveEdit} style={{ marginLeft: 8 }}>
                  저장
                </button>
                <button
                  onClick={() => {
                    setEditId(null);
                    setEditContent("");
                  }}
                  style={{ marginLeft: 6 }}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <b>{c.user?.name ?? "익명"}</b>
                  <span style={{ fontSize: 12, color: "gray" }}>{c.created_at || c.createdAt}</span>
                </div>
                <div style={{ marginTop: 4 }}>{c.content}</div>

                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                  <button onClick={() => setReplyTarget(c.id)} style={{ fontSize: 12 }}>답글</button>
                  <button
                    style={{ fontSize: 12 }}
                    onClick={() => {
                      setEditId(c.id);
                      setEditContent(c.content);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => handleDeleteComment(c.id)} style={{ fontSize: 12, color: "red" }}>삭제</button>
                </div>
              </>
            )}

            {/* 답글 입력 */}
            {replyTarget === c.id && (
              <div style={{ marginTop: 8, display: "flex", gap: 6, paddingLeft: 20 }}>
                <input
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="답글 입력"
                  style={{ flex: 1, padding: 6 }}
                />
                <button onClick={() => addReply(c.id)}>등록</button>
                <button
                  onClick={() => {
                    setReplyTarget(null);
                    setNewReply("");
                  }}
                >
                  취소
                </button>
              </div>
            )}

            {/* 답글 목록 */}
            {repliesOf(c.id).map((r) => (
              <div
                key={r.id}
                style={{
                  marginTop: 8,
                  marginLeft: 20,
                  borderLeft: "3px solid #ccc",
                  paddingLeft: 10,
                  paddingTop: 4,
                  paddingBottom: 4
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                   <b>{r.user?.name ?? "익명"}</b>
                   <span style={{ fontSize: 11, color: "gray" }}>{r.created_at || r.createdAt}</span>
                </div>
                <div style={{ marginTop: 2 }}>{r.content}</div>
                <div style={{ marginTop: 4 }}>
                  <button onClick={() => handleDeleteComment(r.id)} style={{ fontSize: 11, color: "red" }}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
