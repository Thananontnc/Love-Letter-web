/**
 * Digital Love Letter - JavaScript
 * This file contains all the interactive functionality for the love letter
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const envelope = document.querySelector('.envelope');
    const letterContainer = document.querySelector('.letter-container');
    const fullscreenLetter = document.querySelector('.fullscreen-letter');
    const closeBtn = document.querySelector('.close-btn');
    const instructions = document.querySelector('.instructions');

    // Function to open the envelope
    function openEnvelope() {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            
            // Change instructions after envelope is opened
            setTimeout(() => {
                instructions.textContent = 'Click on the letter to view it in full screen';
                
                // Create floating hearts animation
                createHearts();
            }, 1000);
        }
    }

    // Function to show letter in fullscreen
    function showFullscreenLetter() {
        if (envelope.classList.contains('open')) {
            fullscreenLetter.classList.add('active');
            instructions.style.opacity = '0';
        }
    }

    // Function to close fullscreen letter
    function closeFullscreenLetter() {
        fullscreenLetter.classList.remove('active');
        instructions.style.opacity = '0.8';
    }

    // Function to create floating hearts animation
    function createHearts() {
        const container = document.querySelector('body');
        
        // Create 15 hearts with random positions and animations
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤';
                heart.style.position = 'absolute';
                heart.style.fontSize = `${Math.random() * 20 + 10}px`;
                heart.style.color = '#e91e63';
                heart.style.opacity = '0';
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = `${Math.random() * 100}%`;
                heart.style.zIndex = '5';
                heart.style.pointerEvents = 'none';
                
                // Add animation
                heart.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
                heart.style.animationDelay = `${Math.random() * 2}s`;
                
                // Add keyframes for float animation if not already added
                if (!document.querySelector('#heart-animation')) {
                    const style = document.createElement('style');
                    style.id = 'heart-animation';
                    style.textContent = `
                        @keyframes float {
                            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                            25% { opacity: 0.8; }
                            50% { transform: translateY(-100px) rotate(10deg); opacity: 0.5; }
                            100% { transform: translateY(-200px) rotate(0deg); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                container.appendChild(heart);
                
                // Make heart visible after a small delay
                setTimeout(() => {
                    heart.style.opacity = '0.8';
                }, 100);
                
                // Remove heart after animation completes
                setTimeout(() => {
                    heart.remove();
                }, 7000);
            }, i * 300);
        }
    }

    // Event listeners
    envelope.addEventListener('click', openEnvelope);
    letterContainer.addEventListener('click', showFullscreenLetter);
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        closeFullscreenLetter();
    });

    // Prevent closing when clicking inside the letter content
    document.querySelector('.fullscreen-letter-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close fullscreen when clicking outside the letter content
    fullscreenLetter.addEventListener('click', closeFullscreenLetter);
});
