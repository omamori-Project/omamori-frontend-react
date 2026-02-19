import { useState } from "react";

export default function OmamoriCreate() {
  const [title, setTitle] = useState("제목을 입력하세요");
  const [content, setContent] = useState("내용을 입력하세요");

  const [editTitle, setEditTitle] = useState(false);
  const [editContent, setEditContent] = useState(false);

  return (
    <div>

      <h1>오마모리 제작</h1>

      {/* ===== 미리보기 영역 ===== */}
      <div>

        {/* 제목 영역 */}
        <div>
          {editTitle ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditTitle(false)}
              autoFocus
            />
          ) : (
            <>
              <h3>{title}</h3>
              <button onClick={() => setEditTitle(true)}>✏️</button>
            </>
          )}
        </div>

        {/* 본문 영역 */}
        <div>
          {editContent ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => setEditContent(false)}
              autoFocus
            />
          ) : (
            <>
              <p>{content}</p>
              <button onClick={() => setEditContent(true)}>✏️</button>
            </>
          )}
        </div>

      </div>

      {/* ===== 하단 액션 버튼 (인스타 느낌 3개) ===== */}
      <div>
        <button>임시저장</button>
        <button>최종저장</button>
        <button>공유</button>
      </div>

      {/* ===== UI 보드 영역 ===== */}
      <div style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
        <h3>UI 보드</h3>

        <div>
          <button>텍스트 추가</button>
          <button>스탬프 추가</button>
          <button>프레임 변경</button>
        </div>
      </div>

    </div>
  );
}
