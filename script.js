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
    
    console.log("Close button found:", closeBtn); // Debug log
    
    // Track state
    let isAnimating = false;

    // Function to open the envelope
    function openEnvelope() {
        if (!envelope.classList.contains('open') && !isAnimating) {
            isAnimating = true;
            envelope.classList.add('open');
            
            // Change instructions after envelope is opened
            setTimeout(() => {
                instructions.textContent = 'Click on the letter to view it in full screen';
                isAnimating = false;
                
                // Create floating hearts animation
                createHearts();
            }, 1000);
        }
    }

    // Function to show letter in fullscreen
    function showFullscreenLetter() {
        if (envelope.classList.contains('open') && !isAnimating) {
            isAnimating = true;
            fullscreenLetter.classList.add('active');
            instructions.style.opacity = '0';
            
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
    }

    // Function to close fullscreen letter
    function closeFullscreenLetter() {
        if (isAnimating) return;
        isAnimating = true;
        
        console.log("Closing letter animation started");
        
        // First hide the fullscreen view
        fullscreenLetter.style.opacity = '0';
        
        setTimeout(() => {
            // Remove active class to hide fullscreen
            fullscreenLetter.classList.remove('active');
            fullscreenLetter.style.opacity = '1';
            
            // Reset letter container to visible position
            letterContainer.style.display = 'block';
            letterContainer.style.opacity = '1';
            letterContainer.style.transform = 'translate(-50%, -50%) translateY(-80px)';
            
            // Force reflow to ensure animation works
            letterContainer.offsetHeight;
            
            // Animate letter going back into envelope
            letterContainer.style.transition = 'all 1.2s ease-in-out';
            letterContainer.style.transform = 'translate(-50%, -50%) translateY(0)';
            letterContainer.style.opacity = '0';
            
            // After letter is back in envelope, reset envelope state
            setTimeout(() => {
                // Reset envelope to closed state
                envelope.classList.remove('open');
                
                // Update instructions
                instructions.textContent = 'Click on the envelope to open it';
                instructions.style.opacity = '0.8';
                
                isAnimating = false;
            }, 1200);
        }, 500);
    }

    // Function to create floating hearts animation
    function createHearts() {
        const container = document.querySelector('body');
        
        // Create 15 hearts with random positions and animations
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
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
    
    // Close button handler - simplified and focused
    closeBtn.addEventListener('click', function(e) {
        console.log("Close button clicked");
        
        // Hide fullscreen letter immediately
        fullscreenLetter.classList.remove('active');
        
        // Reset envelope state
        setTimeout(() => {
            envelope.classList.remove('open');
            instructions.textContent = 'Click on the envelope to open it';
            instructions.style.opacity = '0.8';
        }, 500);
        
        e.stopPropagation();
    });
    
    // Prevent closing when clicking inside the letter content
    document.querySelector('.fullscreen-letter-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close fullscreen when clicking outside the letter content
    fullscreenLetter.addEventListener('click', function(e) {
        if (e.target === fullscreenLetter && !isAnimating) {
            closeFullscreenLetter();
        }
    });
});
