const checkboxlist = document.querySelectorAll('.checkbox');
const inputfield = document.querySelectorAll('.input-text');
const errorLabel = document.querySelector('.error-label');
const progressvalue = document.querySelector('.progress');
const labels = document.querySelector('.first-para');

const allquotes = [
    "Raise the bar by completing goals",
    "Well begun is half done",
    "Just a step away, keep going",
    "Whoa! You have completed all goals, time to chill"
];

const allgoals = JSON.parse(localStorage.getItem('allgoals')) || {};

const totalGoals = checkboxlist.length;

let completedgoalcount = Object.values(allgoals).filter((goal) => goal.completed).length;

function updateProgress() {
    if (totalGoals > 0) {
        progressvalue.style.width = `${(completedgoalcount / totalGoals) * 100}%`;
        progressvalue.querySelector('span').textContent = `${completedgoalcount}/${totalGoals} completed`;
        labels.innerText = allquotes[completedgoalcount];
    } else {
        progressvalue.style.width = '0%';
        progressvalue.querySelector('span').textContent = '0/0 completed';
    }
}

updateProgress();

checkboxlist.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const inputField = checkbox.nextElementSibling;

        if (inputField.value.trim() === "") {
            errorLabel.style.display = "block";
        } else {
            errorLabel.style.display = "none";
            checkbox.parentElement.classList.toggle('completed');
            const inputid = inputField.id;

            if (!allgoals[inputid]) {
                allgoals[inputid] = { name: inputField.value, completed: false };
            }
            allgoals[inputid].completed = !allgoals[inputid].completed;

            
            inputField.disabled = allgoals[inputid].completed;

            completedgoalcount = Object.values(allgoals).filter((goal) => goal.completed).length;
            updateProgress();

            localStorage.setItem('allgoals', JSON.stringify(allgoals));
        }
    });
});

inputfield.forEach((input) => {
    if (allgoals[input.id]) {
        input.value = allgoals[input.id].name;
        if (allgoals[input.id].completed) {
            input.parentElement.classList.add('completed');
            input.disabled = true;
        }
    }

    input.addEventListener('focus', () => {
        errorLabel.style.display = "none";
    });

    input.addEventListener('input', () => {
        errorLabel.style.display = "none";

        if (!allgoals[input.id] || !allgoals[input.id].completed) {
            allgoals[input.id] = {
                name: input.value,
                completed: allgoals[input.id]?.completed || false
            };
            localStorage.setItem('allgoals', JSON.stringify(allgoals));
        }
    });
});
