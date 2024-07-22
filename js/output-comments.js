const commentListElement = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');

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
const displayComments = (comments) => {
  const commentsFragmentElement = document.createDocumentFragment();
  comments.forEach((element) => {
    const newComment = getComment(element);
    commentsFragmentElement.append(newComment);
  });
  commentListElement.innerHTML = '';
  commentListElement.append(commentsFragmentElement);
};

export { displayComments };
