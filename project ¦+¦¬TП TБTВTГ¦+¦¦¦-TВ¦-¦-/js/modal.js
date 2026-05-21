const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const modalClose = document.querySelector('.modal_close');
const modalForm = document.querySelector('.modal form');

if (modal && modalTrigger && modalClose) {
    const openModal = () => {
        modal.classList.add('modal_show');
        document.body.classList.add('modal_open');
    };

    const closeModal = () => {
        modal.classList.remove('modal_show');
        document.body.classList.remove('modal_open');
    };

    modalTrigger.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    if (modalForm) {
        modalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            closeModal();
            alert('Спасибо! Заявка отправлена.');
            modalForm.reset();
        });
    }
}
