const QTY_SHOW_COMMENTS = 5;

const commentElement = document.querySelector('.social__comment');
const commentListElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const commentShownCountElement = document.querySelector('.social__comment-shown-count');
const commentTotalCountElement = document.querySelector('.social__comment-total-count');

const startIndex = 0;
let endIndex = 0;
let arrayComments = [];

//создание одного комментария для списка
const getComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  const socialPictureElement = comment.querySelector('.social__picture');
  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

//создание списка комментариев
const getListComments = () => {
  endIndex += QTY_SHOW_COMMENTS;

  if (endIndex >= arrayComments.length) {
    commentsLoaderElement.classList.add('hidden');
    endIndex = arrayComments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const commentsFragmentElement = document.createDocumentFragment();
  arrayComments.slice(startIndex, endIndex).forEach((element) => {
    const newComment = getComment(element);
    commentsFragmentElement.append(newComment);
  });
  commentListElement.innerHTML = '';
  commentListElement.append(commentsFragmentElement);
  commentTotalCountElement.textContent = arrayComments.length;
  commentShownCountElement.textContent = endIndex;
};

const displayComments = (comments) => {
  endIndex = 0;
  arrayComments = comments;
  getListComments();
  commentsLoaderElement.addEventListener('click', getListComments);
};

export { displayComments };
