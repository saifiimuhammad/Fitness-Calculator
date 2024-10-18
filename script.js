document.getElementById('fitnessForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activityLevel = document.getElementById('activityLevel').value;

    // Validate inputs
    if (!age || age < 1 || age > 120) {
        document.getElementById('ageError').style.display = 'block';
        return;
    } else {
        document.getElementById('ageError').style.display = 'none';
    }

    if (!height || height < 50 || height > 300) {
        document.getElementById('heightError').style.display = 'block';
        return;
    } else {
        document.getElementById('heightError').style.display = 'none';
    }

    if (!weight || weight < 20 || weight > 500) {
        document.getElementById('weightError').style.display = 'block';
        return;
    } else {
        document.getElementById('weightError').style.display = 'none';
    }

    // Calculate BMI
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

    // Show results
    displayResults(bmi, weight, height, age, gender, activityLevel);
});

function displayResults(bmi, weight, height, age, gender, activityLevel) {
    const resultsDiv = document.getElementById('results');
    const bmiValue = document.getElementById('bmiValue');
    const status = document.getElementById('status');
    const weightRecommendation = document.getElementById('weightRecommendation');
    const exerciseList = document.getElementById('exerciseList');
    const dietTips = document.getElementById('dietTips');

    bmiValue.textContent = bmi;
    resultsDiv.classList.add('show');

    let bmiStatus, statusColor, exercises, dietAdvice;

    if (bmi < 18.5) {
        bmiStatus = "Underweight";
        statusColor = "var(--warning-color)";
        exercises = getExercisesForUnderweight();
        dietAdvice = "Focus on increasing caloric intake with nutrient-dense foods.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiStatus = "Normal weight";
        statusColor = "var(--success-color)";
        exercises = getExercisesForNormalWeight();
        dietAdvice = "Maintain a balanced diet rich in whole foods.";
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiStatus = "Overweight";
        statusColor = "var(--warning-color)";
        exercises = getExercisesForOverweight();
        dietAdvice = "Focus on portion control and increasing activity levels.";
    } else {
        bmiStatus = "Obese";
        statusColor = "var(--error-color)";
        exercises = getExercisesForObese();
        dietAdvice = "Consider a low-calorie diet and regular physical activity.";
    }

    status.textContent = `BMI Status: ${bmiStatus}`;
    status.style.backgroundColor = statusColor;
    weightRecommendation.textContent = getWeightRecommendation(bmi, height);
    displayExercises(exercises, exerciseList);
    dietTips.textContent = dietAdvice;
}

function getWeightRecommendation(bmi, height) {
    const normalWeightMin = (18.5 * ((height / 100) ** 2)).toFixed(1);
    const normalWeightMax = (24.9 * ((height / 100) ** 2)).toFixed(1);
    return `To maintain a healthy weight, your weight should be between ${normalWeightMin}kg and ${normalWeightMax}kg.`;
}

function displayExercises(exercises, exerciseList) {
    exerciseList.innerHTML = '';
    exercises.forEach(exercise => {
        const li = document.createElement('li');
        li.textContent = exercise;
        exerciseList.appendChild(li);
    });
}

function getExercisesForUnderweight() {
    return [
        "Strength training exercises like weight lifting",
        "Yoga for muscle building",
        "High-protein intake workouts",
        "Pilates to improve core strength"
    ];
}

function getExercisesForNormalWeight() {
    return [
        "Jogging or running for cardiovascular health",
        "Strength training 3-4 times a week",
        "Swimming for full-body conditioning",
        "Cycling for endurance"
    ];
}

function getExercisesForOverweight() {
    return [
        "Brisk walking or light jogging",
        "Low-impact aerobics",
        "Resistance band exercises",
        "Water aerobics to reduce joint strain"
    ];
}

function getExercisesForObese() {
    return [
        "Walking for beginners",
        "Seated exercises",
        "Chair squats and push-ups",
        "Light water exercises"
    ];
}
