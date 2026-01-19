document.addEventListener('DOMContentLoaded', () => {

    // --- Form Handling ---
    const form = document.getElementById('waitlist-form');
    const message = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Mock submission
            console.log(`New Consultation Request Received!`);

            form.style.display = 'none';
            message.style.display = 'block';
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Calendar Interactions (Mock) ---
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => {
                s.style.background = 'transparent';
                s.style.color = 'inherit';
            });
            slot.style.background = 'var(--color-accent)';
            slot.style.color = 'var(--color-primary)';
        });
    });
});

// --- Quiz Logic ---
const quizData = {
    'life-science': {
        title: "Life Science Challenge",
        questions: [
            {
                q: "Which part of the cell is known as the 'powerhouse'?",
                options: ["Nucleus", "Mitochondria", "Ribosome"],
                ans: 1
            },
            {
                q: "What is the first step of the Scientific Method?",
                options: ["Experiment", "Observation/Question", "Conclusion"],
                ans: 1
            },
            {
                q: "DNA is shaped like a...",
                options: ["Single Loop", "Double Helix", "Triple Spiral"],
                ans: 1
            }
        ]
    },
    'biology': {
        title: "AP Biology Check",
        questions: [
            {
                q: "Which molecule carries genetic info from DNA to the ribosome?",
                options: ["tRNA", "mRNA", "rRNA"],
                ans: 1
            },
            {
                q: "Enzymes work by...",
                options: ["Raising temperature", "Lowering activation energy", "Adding pressure"],
                ans: 1
            },
            {
                q: "Which process creates ATP in the presence of Oxygen?",
                options: ["Fermentation", "Cellular Respiration", "Glycolysis"],
                ans: 1
            }
        ]
    },
    'chemistry': {
        title: "Chemistry Rapid Fire",
        questions: [
            {
                q: "What is the pH of a neutral substance?",
                options: ["1", "7", "14"],
                ans: 1
            },
            {
                q: "Which subatomic particle has a negative charge?",
                options: ["Proton", "Neutron", "Electron"],
                ans: 2
            },
            {
                q: "In 'PV = nRT', what does 'P' stand for?",
                options: ["Pressure", "Position", "Power"],
                ans: 0
            }
        ]
    }
};

let currentQuizId = null;
let currentQuestionIndex = 0;
let score = 0;

function openQuiz(track) {
    const modal = document.getElementById('quiz-modal');
    modal.style.display = 'flex';
    currentQuizId = track;
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const data = quizData[currentQuizId];

    if (currentQuestionIndex >= data.questions.length) {
        // Show Result
        container.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 1rem;">Quiz Complete!</h2>
            <div style="font-size: 4rem; text-align: center; margin: 2rem 0;">${score}/${data.questions.length}</div>
            <p style="text-align: center; color: var(--color-text-muted);">Great job! Ready to master the rest?</p>
            <button class="btn btn-primary" onclick="closeQuiz()" style="width: 100%; margin-top: 2rem;">Close</button>
        `;
        return;
    }

    const q = data.questions[currentQuestionIndex];

    let html = `<h3>${data.title}</h3>
                <p style="margin: 1rem 0; font-size: 1.1rem;">${currentQuestionIndex + 1}. ${q.q}</p>`;

    q.options.forEach((opt, idx) => {
        html += `<button class="quiz-option" onclick="checkAnswer(${idx}, this)">${opt}</button>`;
    });

    container.innerHTML = html;
}

function checkAnswer(selectedIdx, btnElement) {
    const data = quizData[currentQuizId];
    const correctIdx = data.questions[currentQuestionIndex].ans;

    if (selectedIdx === correctIdx) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        // highlight correct one
        const options = document.querySelectorAll('.quiz-option');
        options[correctIdx].classList.add('correct');
    }

    // Wait a bit then next question
    setTimeout(() => {
        currentQuestionIndex++;
        renderQuestion();
    }, 1000);
}
