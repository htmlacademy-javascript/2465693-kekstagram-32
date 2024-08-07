const QTY_SHOW_COMMENTS = 5;

const commentElement = document.querySelector('.social__comment');
const commentListElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const commentShownCountElement = document.querySelector('.social__comment-shown-count');
const commentTotalCountElement = document.querySelector('.social__comment-total-count');

let startIndex = 0;
let endIndex = 0;
let arrayComments = [];

const getComment = ({ avatar, name, message }) => {
  const cloneCommentElement = commentElement.cloneNode(true);
  const socialPictureElement = cloneCommentElement.querySelector('.social__picture');
  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  cloneCommentElement.querySelector('.social__text').textContent = message;
  return cloneCommentElement;
};

const getListComments = () => {
  endIndex = Math.min(startIndex + QTY_SHOW_COMMENTS, arrayComments.length);
  commentsLoaderElement.classList.toggle('hidden', endIndex >= arrayComments.length);

  arrayComments.slice(startIndex, endIndex).forEach((element) => {
    const newComment = getComment(element);
    commentListElement.append(newComment);
  });

  startIndex += QTY_SHOW_COMMENTS;

  commentTotalCountElement.textContent = arrayComments.length;
  commentShownCountElement.textContent = endIndex;
};

const displayComments = (comments) => {
  commentListElement.innerHTML = '';
  startIndex = 0;
  arrayComments = comments;
  getListComments();
  commentsLoaderElement.addEventListener('click', getListComments);
};

export { displayComments };
