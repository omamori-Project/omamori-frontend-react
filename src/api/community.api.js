import axiosIns from "./axiosInstance.js";

/* =========================
   공통 응답 정리 함수
========================= */

// 백엔드 응답 모양이 조금 달라도 프론트에서 최대한 버틸 수 있게 정리
const extractList = (resData) => {
  if (Array.isArray(resData)) return resData;
  if (Array.isArray(resData?.data)) return resData.data;
  if (Array.isArray(resData?.items)) return resData.items;
  if (Array.isArray(resData?.data?.items)) return resData.data.items;
  if (Array.isArray(resData?.posts)) return resData.posts;
  return [];
};

const extractItem = (resData) => {
  if (resData?.data) return resData.data;
  return resData;
};

// 게시글 한 개를 화면용 모양으로 정리
export const normalizePost = (post) => ({
  id: post?.id,
  title: post?.title ?? "",
  content: post?.content ?? "",
  user: {
    id: post?.user?.id ?? post?.author?.id ?? null,
    name:
      post?.user?.name ??
      post?.author?.name ??
      post?.user_name ??
      post?.author_name ??
      "작성자",
  },
  liked: post?.liked ?? post?.isLiked ?? false,
  bookmarked: post?.bookmarked ?? post?.isBookmarked ?? false,
  likeCount: post?.likeCount ?? post?.like_count ?? 0,
  commentCount: post?.commentCount ?? post?.comment_count ?? 0,
  createdAt: post?.createdAt ?? post?.created_at ?? "",
});

/* =========================
   게시글 (Posts)
========================= */

// 게시글 작성
export const createPost = async (data) => {
  const res = await axiosIns.post("/posts", data);
  return extractItem(res.data);
};

// 전체 게시글 목록
export const getPosts = async (page = 1, size = 10, sort = "latest") => {
  const res = await axiosIns.get(`/posts?page=${page}&size=${size}&sort=${sort}`);
  const list = extractList(res.data);
  return list.map(normalizePost);
};

// 게시글 상세
export const getPostDetail = async (postId) => {
  const res = await axiosIns.get(`/posts/${postId}`);
  return normalizePost(extractItem(res.data));
};

// 게시글 수정
export const updatePost = async (postId, data) => {
  const res = await axiosIns.patch(`/posts/${postId}`, data);
  return extractItem(res.data);
};

// 게시물 삭제
export const deletePost = async (postId) => {
  await axiosIns.delete(`/posts/${postId}`);
  return true;
};

// 특정 유저 게시글 목록
export const getUserPosts = async (userId, page = 1, size = 10) => {
  const res = await axiosIns.get(`/users/${userId}/posts?page=${page}&size=${size}`);
  const list = extractList(res.data);
  return {
    data: list.map(normalizePost),
    meta: res.data.meta || {}
  };
};

// 내 게시글 목록
export const getMyPosts = async (page = 1, size = 10, sort = "latest") => {
  const res = await axiosIns.get(`/me/posts?page=${page}&size=${size}&sort=${sort}`);
  const list = extractList(res.data);
  return {
    data: list.map(normalizePost),
    meta: res.data.meta || {}
  };
};

/* =========================
   댓글 (Comments)
========================= */

// 댓글 목록 (특정 게시글)
export const getComments = async (postId, page = 1, size = 10) => {
  const res = await axiosIns.get(`/posts/${postId}/comments?page=${page}&size=${size}`);
  return res.data;
};

// 내 댓글/답글 목록
export const getMyComments = async (page = 1, size = 10, sort = "latest") => {
  const res = await axiosIns.get(`/me/comments?page=${page}&size=${size}&sort=${sort}`);
  return res.data;
};

// 댓글 작성
export const createComment = async (postId, data) => {
  const res = await axiosIns.post(`/posts/${postId}/comments`, data);
  return res.data;
};

// 댓글 수정
export const updateComment = async (commentId, data) => {
  const res = await axiosIns.patch(`/comments/${commentId}`, data);
  return res.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  await axiosIns.delete(`/comments/${commentId}`);
  return true;
};

// 답글 작성
export const createReply = async (commentId, data) => {
  const res = await axiosIns.post(`/comments/${commentId}/replies`, data);
  return res.data;
};

/* =========================
   좋아요 (Likes)
========================= */

// 좋아요 추가
export const likePost = async (postId) => {
  await axiosIns.post(`/posts/${postId}/likes`, {});
  return true;
};

// 좋아요 취소
export const unlikePost = async (postId) => {
  await axiosIns.delete(`/posts/${postId}/likes`);
  return true;
};

// 좋아요 여부 확인
export const checkLike = async (postId) => {
  const res = await axiosIns.get(`/posts/${postId}/likes/me`);
  return res.data;
};

/* =========================
   북마크 (Bookmarks)
========================= */

// 북마크 추가
export const bookmarkPost = async (postId) => {
  await axiosIns.post(`/posts/${postId}/bookmarks`, {});
  return true;
};

// 북마크 취소
export const unbookmarkPost = async (postId) => {
  await axiosIns.delete(`/posts/${postId}/bookmarks`);
  return true;
};

// 내 북마크 목록
export const getMyBookmarks = async (page = 1, size = 10) => {
  const res = await axiosIns.get(`/me/bookmarks?page=${page}&size=${size}`);
  return res.data;
};