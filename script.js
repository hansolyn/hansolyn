const questions = [
  // 인간관계
  { question: "1등상금 200만원 주는 재미있는 토요일 단합대회 vs 안 받고 안 하기", options: ["한다", "안 한다"], score: [1, -1], category: "인간관계" },
  { question: "다양한 부서 사람들과 교류하며 지내기 vs 업무 연관된 소수의 사람만 친하게 지내기", options: ["다수", "소수"], score: [1, -1], category: "인간관계" },
  { question: "조용한 사무실 vs 시끌벅적한 사무실", options: ["조용", "시끌"], score: [1, -1], category: "인간관계" },
  
  // 복지 돈
  { question: "식권(회사근처 편의점, 카페, 식당 사용가능) 연320만원 vs 연봉에 식대(비과세) 240만원", options: ["식권", "연봉"], score: [1, -1], category: "복지 돈" },
  { question: "다양한 복지가 있는 회사 vs 복지는 없지만 연봉이 높은 회사", options: ["복지", "연봉"], score: [1, -1], category: "복지 돈" },
  { question: "주4일제 하고 월급 적게 받기 vs 지금처럼 하기", options: ["시간", "돈"], score: [1, -1], category: "복지 돈" },
  
  // 안정 변화
  { question: "처음 세운 계획대로 하기 vs 트렌드에 맞춘 잦은 변화", options: ["계획", "변화"], score: [1, -1], category: "안정 변화" },
  { question: "낮지만 꾸준한 연봉인상률 vs 평가에 따라 매년 달라지는 연봉인상률", options: ["고정인상률", "변동인상률"], score: [1, -1], category: "안정 변화" },
  { question: "주기적으로 정해진 날에만 보고하기 vs 이슈 있을 때마다 보고하기", options: ["정기보고", "수시보고"], score: [1, -1], category: "안정 변화" },

  // 업무스타일
  { question: "지시받은 일만 하기 vs 내가 주도해서 하기", options: ["지시", "주도"], score: [1, -1], category: "업무스타일" },
  { question: "하나하나 보고해서 컨펌받고 결과에 책임 안 지기 vs 착수보고만 하고 결과에 책임지기", options: ["컨펌", "책임"], score: [1, -1], category: "업무스타일" },
  { question: "보람없지만 보상있는 일 vs 보람차지만 보상없는 일", options: ["보상", "보람"], score: [1, -1], category: "업무스타일" },

  // 개인과 조직
  { question: "평가등급/등수 전사 공개 vs 비공개", options: ["공개", "비공개"], score: [1, -1], category: "개인과 조직" },
  { question: "성과급 다같이 나눠받기 vs 기여도에 따라 다르게 받기", options: ["N분의 1", "기여도에 비례"], score: [1, -1], category: "개인과 조직" },
  { question: "업무능력 떨어지지만 사회성 좋은 동료 vs 업무능력 뛰어나지만 사회성 없는 동료", options: ["사회성", "업무능력"], score: [1, -1], category: "개인과 조직" },

  // 기타현안
  { question: "지금 자리에서 계속 일하기 vs 새로운 곳으로 이사가기", options: ["지금 자리", "새로운 곳"], score: [1, -1], category: "기타현안" },
  { question: "점심시간에도 건설적인 업무얘기 하는 동료 vs 업무시간에도 재밌지만 실없는 얘기 하는 동료", options: ["업무얘기", "실없는 얘기"], score: [1, -1], category: "기타현안" },
];

let currentQuestionIndex = 0;
let userChoices = [];
let categoryScores = {
  "인간관계": 0,
  "복지 돈": 0,
  "안정 변화": 0,
  "업무스타일": 0,
  "개인과 조직": 0,
};

// HTML 요소 가져오기
const questionElement = document.querySelector(".question");
const option1Button = document.getElementById("option1");
const option2Button = document.getElementById("option2");

let usedQuestions = []; // 이미 사용한 질문의 인덱스 저장

// 질문 로드 함수
function loadQuestion() {
  const gameContainer = document.getElementById("game-container");
  
  if (usedQuestions.length >= questions.length) {
    showResults();
    return;
  }

  // 랜덤으로 질문 선택
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(randomIndex)); // 이미 사용한 질문은 제외

  usedQuestions.push(randomIndex); // 사용한 질문 기록

  const currentQuestion = questions[randomIndex];

  // 화면 구성
  gameContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <div class="options">
      <button id="option1">${currentQuestion.options[0]}</button>
      <button id="option2">${currentQuestion.options[1]}</button>
    </div>
  `;

  // 버튼 클릭 이벤트 연결
  document.getElementById("option1").onclick = () => recordChoice(randomIndex, 0);
  document.getElementById("option2").onclick = () => recordChoice(randomIndex, 1);
}

// 선택 기록 함수
function recordChoice(questionIndex, optionIndex) {
  const currentQuestion = questions[questionIndex];
  userChoices.push(optionIndex);
  categoryScores[currentQuestion.category] += currentQuestion.score[optionIndex];

  loadQuestion(); // 다음 질문 로드
}

// 게임재시작 함수
function resetGame() {
  currentQuestionIndex = 0;
  userChoices = [];
  categoryScores = {
    "인간관계": 0,
    "복지 돈": 0,
    "안정 변화": 0,
    "업무스타일": 0,
    "개인과 조직": 0,
  };
  usedQuestions = []; // 사용한 질문 초기화

  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = ""; // 화면 초기화
  loadQuestion(); // 첫 번째 질문 로드
}


// 결과 출력 함수
function showResults() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = ""; // 이전 내용을 초기화

  let resultMessages = "<h2>당신의 성향 분석 결과</h2>";

  // 인간관계
  if (categoryScores["인간관계"] > 0) {
    resultMessages += "<p>당신은 넓고 다양한 인간관계를 추구하는 성향입니다!</p>";
  } else if (categoryScores["인간관계"] < 0) {
    resultMessages += "<p>당신은 좁고 긴밀한 인간관계를 추구하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>당신은 인간관계의 범위와 깊이에 있어 균형을 추구하는 성향입니다.</p>";
  }

  // 복지 돈
  if (categoryScores["복지 돈"] > 0) {
    resultMessages += "<p>금전적 보상보다 유무형의 복지제도를 선호하는 성향입니다!</p>";
  } else if (categoryScores["복지 돈"] < 0) {
    resultMessages += "<p>복지제도보다 금전적 보상을 선호하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>복지와 금전적 보상의 균형을 추구하는 성향입니다.</p>";
  }

  // 안정 변화
  if (categoryScores["안정 변화"] > 0) {
    resultMessages += "<p>안정을 추구하는 성향입니다!</p>";
  } else if (categoryScores["안정 변화"] < 0) {
    resultMessages += "<p>변화를 추구하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>안정과 변화를 균형을 추구하는 성향입니다.</p>";
  }

  // 업무스타일
  if (categoryScores["업무스타일"] > 0) {
    resultMessages += "<p>수동적인 업무스타일을 선호하는 성향입니다!</p>";
  } else if (categoryScores["업무스타일"] < 0) {
    resultMessages += "<p>능동적인 업무스타일을 선호하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>균형 있는 업무스타일을 선호하는 성향입니다.</p>";
  }

  // 개인과 조직
  if (categoryScores["개인과 조직"] > 0) {
    resultMessages += "<p>개인보다 조직 전체를 우선시하는 성향입니다!</p>";
  } else if (categoryScores["개인과 조직"] < 0) {
    resultMessages += "<p>조직 전체보다 개인의 성과를 우선시하는 성향입니다.</p>";
  } else {
    resultMessages += "<p>개인과 조직 간의 균형을 추구하는 성향입니다.</p>";
  }

  // 결과 메시지 출력
  gameContainer.innerHTML = resultMessages;

  // 다시 시작 버튼 추가
  const restartButton = document.createElement("button");
  restartButton.textContent = "다시 시작하기";
  restartButton.onclick = resetGame;
  gameContainer.appendChild(restartButton);
}

// 게임 시작
loadQuestion();
