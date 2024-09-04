document.addEventListener("DOMContentLoaded", function () {
    let typingInProgress = false; 
    function openModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "flex";

        const messageElement = document.querySelector(".modal-content .message p");
        const messageText = messageElement.getAttribute("data-fulltext");

        messageElement.style.visibility = "hidden";
        messageElement.style.opacity = 1;
        messageElement.innerHTML = "";

        
        if (typingInProgress) {
            typingInProgress = false;
            clearTimeout(typingTimer); 
        }

        setTimeout(function () {
            typeWriter(messageElement, messageText);
        }, 4000);

        const closeButton = document.querySelector('.close-btn');
        closeButton.removeEventListener('click', closeModal);
        closeButton.addEventListener('click', function () {
            closeModal(modal);
        });
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        const messageElement = document.querySelector(".modal-content .message p");
        messageElement.style.visibility = "hidden";
        messageElement.style.opacity = 1;
        typingInProgress = false; 
    }

    let typingTimer; 

    function typeWriter(element, text) {
        let index = 0;
        element.style.visibility = "visible";
        typingInProgress = true;

        function type() {
            if (!typingInProgress) return; 

            if (index < text.length) {
                if (text.charAt(index) === '<') {
                    const endIndex = text.indexOf('>', index);
                    element.innerHTML += text.substring(index, endIndex + 1);
                    index = endIndex + 1;
                } else {
                    element.innerHTML += text.charAt(index);
                    index++;
                }
                typingTimer = setTimeout(type, 50); 
            } else {
                typingInProgress = false; 
            }
        }

        type();
    }

    function openAction() {
        let currentIndex = 0;
        const hearts = document.querySelectorAll('#modal-overlay1 img');
        const overlay1 = document.getElementById('modal-overlay1');
        const overlay2 = document.getElementById('modal-overlay2');
        const modal1 = overlay1.querySelector('.heart-modal-1');
        const modal2 = overlay2.querySelector('.heart-modal-2');
        const playSoundButton = document.getElementById('play-sound');
        const voiceText = document.getElementById('voice-text');
        const fullText = voiceText.getAttribute("data-fulltext");
        const textDuration = 2000;

        function animateHeart() {
            if (currentIndex > 0) {
                hearts[currentIndex - 1].classList.remove('active');
            }
            if (currentIndex < hearts.length) {
                hearts[currentIndex].classList.add('active');
                setTimeout(() => {
                    hearts[currentIndex].classList.remove('active');
                    currentIndex++;
                    animateHeart();
                }, 500);
            } else {
                setTimeout(() => {
                    slideOutAndShowNextModal();
                }, 500);
            }
        }

        function slideOutAndShowNextModal() {
            modal1.classList.add('hide');
            setTimeout(() => {
                overlay1.style.display = 'none';
                overlay2.style.display = 'flex';
                modal2.classList.add('show');
            }, 500);
        }

        function displayText() {
            const words = fullText.split(/(\s+)/);
            let wordIndex = 0;
            const interval = textDuration / words.length;

            function showNextWord() {
                if (wordIndex < words.length) {
                    voiceText.textContent = words.slice(0, wordIndex + 1).join('');
                    voiceText.style.opacity = 1;
                    wordIndex++;
                    setTimeout(showNextWord, interval);
                } else {
                    setTimeout(() => {
                        voiceText.style.opacity = 0;
                    }, interval);
                }
            }

            showNextWord();
        }

        playSoundButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const audio = new Audio('mp3/voice.mp3');
            audio.play();
            displayText();
        });

        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const overlay = this.closest('.overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
                const modal = document.getElementById("myModal");
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });


        overlay1.style.display = 'flex';
        animateHeart();
    }

    if (typeof window.openModal === "undefined") {
        window.openModal = openModal;
    }
    if (typeof window.openAction === "undefined") {
        window.openAction = openAction;
    }
});
