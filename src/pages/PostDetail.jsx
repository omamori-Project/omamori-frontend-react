import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const pid = Number(postId);

  // 🔹 기본 글 목데이터
  const basePosts = [
    {
      id: 1,
      title: "첫 오마모리 완성!",
      content: "시험 합격 기원합니다 🙏",
      user: { name: "ㅇㅇ" },
    },
    {
      id: 2,
      title: "취업 성공하고 싶어요",
      content: "올해는 꼭 취뽀…",
      user: { name: "유저2" },
    },
  ];

  const savedPosts = JSON.parse(localStorage.getItem("mock_posts") || "[]");
  const post =
    savedPosts.find((p) => Number(p.id) === pid) ||
    basePosts.find((p) => p.id === pid);

  // ======================
  // 🔥 댓글 상태
  // ======================

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // 🔹 localStorage에서 댓글 불러오기
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(`comments_${pid}`) || "[]"
    );
    setComments(saved);
  }, [pid]);

  // 🔹 localStorage 저장
  const saveComments = (data) => {
    localStorage.setItem(`comments_${pid}`, JSON.stringify(data));
    setComments(data);
  };

  // ======================
  // 댓글 작성
  // ======================
  const addComment = () => {
    if (!newComment.trim()) return;

    const newData = [
      ...comments,
      {
        id: Date.now(),
        parent_id: null,
        content: newComment,
        user: { name: "나" },
      },
    ];

    saveComments(newData);
    setNewComment("");
  };

  // ======================
  // 답글 작성
  // ======================
  const addReply = (parentId) => {
    if (!newReply.trim()) return;

    const newData = [
      ...comments,
      {
        id: Date.now(),
        parent_id: parentId,
        content: newReply,
        user: { name: "나" },
      },
    ];

    saveComments(newData);
    setNewReply("");
    setReplyTarget(null);
  };

  // ======================
  // 삭제
  // ======================
  const deleteComment = (id) => {
    const filtered = comments.filter(
      (c) => c.id !== id && c.parent_id !== id
    );
    saveComments(filtered);
  };

  // ======================
  // 수정
  // ======================
  const saveEdit = () => {
    const updated = comments.map((c) =>
      c.id === editId ? { ...c, content: editContent } : c
    );
    saveComments(updated);
    setEditId(null);
    setEditContent("");
  };

  if (!post) {
    return (
      <div style={{ padding: 20 }}>
        <p>게시글을 찾을 수 없습니다.</p>
        <button onClick={() => navigate("/community")}>목록으로</button>
      </div>
    );
  }

  const topComments = comments.filter((c) => c.parent_id === null);
  const repliesOf = (id) => comments.filter((c) => c.parent_id === id);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate("/community")}>← 목록으로</button>

      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ color: "gray" }}>작성자: {post.user?.name}</p>

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
      {topComments.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 10,
          }}
        >
          {editId === c.id ? (
            <>
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={saveEdit}>저장</button>
            </>
          ) : (
            <>
              <div><b>{c.user.name}</b></div>
              <div>{c.content}</div>

              <div style={{ marginTop: 5 }}>
                <button onClick={() => setReplyTarget(c.id)}>답글</button>
                <button
                  onClick={() => {
                    setEditId(c.id);
                    setEditContent(c.content);
                  }}
                >
                  수정
                </button>
                <button onClick={() => deleteComment(c.id)}>삭제</button>
              </div>
            </>
          )}

          {/* 답글 입력 */}
          {replyTarget === c.id && (
            <div style={{ marginTop: 8 }}>
              <input
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="답글 입력"
              />
              <button onClick={() => addReply(c.id)}>등록</button>
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
              }}
            >
              <b>{r.user.name}</b>
              <div>{r.content}</div>
              <button onClick={() => deleteComment(r.id)}>삭제</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}