// REC-BTN

const btnRec = document.querySelectorAll('.rec__actions-btn');

btnRec.forEach((btn) => {
    btn.addEventListener('click', function () {
        btnRec.forEach((otherBtn) => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('active');
            }
        });

        btn.classList.toggle('active');
    });
});

// RATING

const ratingBlocks = document.querySelectorAll('.rating__actions-like');

ratingBlocks.forEach((ratingBlock) => {
    ratingBlock.addEventListener('click', function () {
        const likeBlock = ratingBlock.querySelector('svg > path');

        ratingBlock.parentNode.querySelectorAll('.rating__actions-like').forEach((otherLike) => {
            otherLike.classList.remove('active', 'click-animation');
        });

        ratingBlock.classList.add('active', 'click-animation');
        const currentRating = Array.from(ratingBlock.parentNode.children).indexOf(ratingBlock) + 1;
        for (let i = 0; i < currentRating; i++) {
            ratingBlock.parentNode.children[i].classList.add('active');
        }

        setTimeout(() => {
            ratingBlock.classList.remove('click-animation');
        }, 200);
    });
});
