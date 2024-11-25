const questions = [
  // 외향 내향
  { question: "1등상금 200만원 주는 재미있는 토요일 단합대회 vs 안 받고 안 하기", options: ["한다", "안 한다"], score: [1, -1], category: "외향 내향" },
  { question: "다양한 부서 사람들과 교류하며 지내기 vs 업무 연관된 소수의 사람만 친하게 지내기", options: ["다수", "소수"], score: [1, -1], category: "외향 내향" },
  { question: "조용한 사무실 vs 시끌벅적한 사무실", options: ["조용", "시끌"], score: [1, -1], category: "외향 내향" },
  
  // 복지 돈
  { question: "식권(회사근처 편의점, 카페, 식당 사용가능) 연320만원 vs 연봉에 식대(비과세) 240만원", options: ["식권", "연봉"], score: [1, -1], category: "복지 돈" },
  { question: "다양한 복지가 있는 회사 vs 복지는 없지만 연봉이 높은 회사", options: ["복지", "연봉"], score: [1, -1], category: "복지 돈" },
  { question: "주4일제 하고 월급 적게 받기 vs 지금처럼 하기", options: ["시간", "돈"], score: [1, -1], category: "복지 돈" },
  
  // 안정 변화
  { question: "처음 세운 계획대로 하기 vs 트렌드에 맞춘 잦은 변화", options: ["계획", "변화"], score: [1, -1], category: "안정 변화" },
  { question: "낮지만 꾸준한 연봉인상률 vs 평가에 따라 매년 달라지는 연봉인상률", options: ["고정인상률", "변동인상률"], score: [1, -1], category: "안정 변화" },
  { question: "주기적으로 정해진 날에만 보고하기 vs 이슈 있을 때마다 보고하기", options: ["정기보고", "수시보고"], score: [1, -1], category: "안정 변화" },

  // 수동 능동
  { question: "지시받은 일만 하기 vs 내가 주도해서 하기", options: ["지시", "주도"], score: [1, -1], category: "수동 능동" },
  { question: "하나하나 보고해서 컨펌받고 결과에 책임 안 지기 vs 착수보고만 하고 결과에 책임지기", options: ["컨펌", "책임"], score: [1, -1], category: "수동 능동" },
  { question: "보람없지만 보상있는 일 vs 보람차지만 보상없는 일", options: ["보상", "보람"], score: [1, -1], category: "수동 능동" },
];

let currentQuestionIndex = 0;
let userChoices = [];
let categoryScores = {
  "외향 내향": 0,
  "복지 돈": 0,
  "안정 변화": 0,
  "수동 능동": 0,
};

// HTML 요소 가져오기
const questionElement = document.querySelector(".question");
const option1Button = document.getElementById("option1");
const option2Button = document.getElementById("option2");

// 질문 로드 함수
function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  option1Button.textContent = currentQuestion.options[0];
  option2Button.textContent = currentQuestion.options[1];

  option1Button.onclick = () => recordChoice(0);
  option2Button.onclick = () => recordChoice(1);
}

// 선택 기록 함수
function recordChoice(optionIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  userChoices.push(optionIndex);
  categoryScores[currentQuestion.category] += currentQuestion.score[optionIndex];

  currentQuestionIndex++;
  loadQuestion();
}

// 결과 출력 함수
function showResults() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = ""; // 이전 내용을 초기화

  let resultMessages = "<h2>당신의 성향 분석 결과</h2>";

  // 외향 내향
  if (categoryScores["외향 내향"] > 0) {
    resultMessages += "<p>당신은 외향적인 성향입니다!</p>";
  } else if (categoryScores["외향 내향"] < 0) {
    resultMessages += "<p>당신은 내향적인 성향입니다.</p>";
  } else {
    resultMessages += "<p>당신은 균형 잡힌 성향입니다.</p>";
  }

  // 복지 돈
  if (categoryScores["복지 돈"] > 0) {
    resultMessages += "<p>복지를 선호하는 성향입니다!</p>";
  } else if (categoryScores["복지 돈"] < 0) {
    resultMessages += "<p>돈을 선호하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>복지와 돈에 균형을 두는 성향입니다.</p>";
  }

  // 안정 변화
  if (categoryScores["안정 변화"] > 0) {
    resultMessages += "<p>안정을 선호하는 성향입니다!</p>";
  } else if (categoryScores["안정 변화"] < 0) {
    resultMessages += "<p>변화와 트렌드를 선호하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>안정과 변화를 균형 있게 선호하는 성향입니다.</p>";
  }

  // 수동 능동
  if (categoryScores["수동 능동"] > 0) {
    resultMessages += "<p>수동적인 업무스타일을 선호하는 성향입니다!</p>";
  } else if (categoryScores["수동 능동"] < 0) {
    resultMessages += "<p>능동적인 업무스타일을 선호하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>균형 있는 업무스타일을 선호하는 성향입니다.</p>";
  }

  // 결과 메시지 출력
  gameContainer.innerHTML = resultMessages;

  // 다시 시작 버튼 추가
  const restartButton = document.createElement("button");
  restartButton.textContent = "다시 시작하기";
  restartButton.onclick = resetGame;
  gameContainer.appendChild(restartButton);
}

// 게임 재시작 함수
function resetGame() {
  currentQuestionIndex = 0;
  userChoices = [];
  categoryScores = {
    "외향 내향": 0,
    "복지 돈": 0,
    "안정 변화": 0,
    "수동 능동": 0,
  };

  loadQuestion();
}

// 게임 시작
loadQuestion();
