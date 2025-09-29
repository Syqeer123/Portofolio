// JavaScript for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');

    // Set up the Intersection Observer for general fade-in reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each .reveal element
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Typing Animation Logic ---
    const typingContainer = document.querySelector('.about-me-text');
    const p1 = document.getElementById('about-p1');
    const p2 = document.getElementById('about-p2');

    const text1 = "Hello! I'm a dedicated and creative college student with a strong passion for building beautiful and intuitive web experiences. I specialize in frontend development, using HTML, CSS, and JavaScript to turn ideas into responsive, interactive websites. I truly enjoy the process of solving problems and making sure every detail is perfect for the user.";
    const text2 = "In addition to coding, I'm proficient in UI/UX design using Figma to create thoughtful wireframes, mockups, and prototypes. I'm actively seeking an internship where I can apply my skills to real-world projects, learn from experienced mentors, and contribute to a team that values clean code and user-centric design. I'm excited to bring my enthusiasm and dedication to a professional setting!";
    
    let animationStarted = false;

    function typeWriter(element, text, callback, speed = 50) {
        let i = 0;
        element.innerHTML = ''; // Clear existing text
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);

        function typing() {
            // This check prevents the error by ensuring the cursor is still a child of the element.
            // This is necessary because scrolling away clears the innerHTML, removing the cursor node.
            if (i < text.length && element.contains(cursor)) {
                element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(typing, speed);
            } else if (element.contains(cursor)) {
                cursor.remove(); // Remove cursor when done
                if (callback) callback();
            }
        }
        typing();
    }

    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationStarted) {
                    animationStarted = true;
                    typeWriter(p1, text1, () => {
                        typeWriter(p2, text2, null, 4); // Type second paragraph a bit faster
                    }, 4);
                }
            } else {
                // Reset when scrolling away
                animationStarted = false;
                p1.innerHTML = '';
                p2.innerHTML = '';
            }
        });
    }, {
        threshold: 0.6 // Start when 60% of the text container is visible
    });

    if (typingContainer) {
        typingObserver.observe(typingContainer);
    }
});
