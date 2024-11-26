const questions = [
  // 인간관계
  { question: "1등상금 200만원 주는 재미있는 토요일 단합대회 vs 안 받고 안 하기", options: ["한다", "안 한다"], score: [1, -1], category: "인간관계" },
  { question: "다양한 부서 사람들과 교류하며 지내기 vs 업무 연관된 소수의 사람만 친하게 지내기", options: ["다수", "소수"], score: [1, -1], category: "인간관계" },
  { question: "시끌벅적한 사무실 vs 조용한 사무실", options: ["시끌", "조용"], score: [1, -1], category: "인간관계" },
  
  // 안정 변화
  { question: "프로젝트 진행 중반에 기가 막힌 아이디어가 떠올랐지만 처음 세운 계획대로 하기 vs 실시간으로 반영하여 계획변경", options: ["계획", "변경"], score: [1, -1], category: "안정 변화" },
  { question: "매년 2%씩 연봉인상 vs 인사평가 결과에 따라 매년 0~10% 연봉인상", options: ["2%", "0~10%"], score: [1, -1], category: "안정 변화" },
  { question: "매주 월요일 9시에 업무보고하기 vs 이슈 있을 때마다 보고하기", options: ["정기보고", "수시보고"], score: [1, -1], category: "안정 변화" },
  
  // 복지 돈
  { question: "연봉 미포함 식권(회사근처 편의점, 카페, 식당 사용가능) 연320만원 지급 vs 연봉에 식대(비과세) 240만원 추가", options: ["식권", "연봉"], score: [1, -1], category: "복지 돈" },
  { question: "다양한 복지가 있는 회사 vs 복지는 하나도 없지만 연봉이 더 높은 회사", options: ["복지", "연봉"], score: [1, -1], category: "복지 돈" },
  { question: "근무시간 줄이고 월급 적게 받기 vs 근무시간 늘리고 월급 더 받기", options: ["시간", "월급"], score: [1, -1], category: "복지 돈" },
  
  // 업무스타일
  { question: "지시받은 일만 하기 vs 내가 주도해서 하기", options: ["지시", "주도"], score: [1, -1], category: "업무스타일" },
  { question: "하나하나 보고해서 컨펌받고 결과에 책임 안 지기 vs 착수보고만 하고 결과에 책임지기", options: ["컨펌", "책임"], score: [1, -1], category: "업무스타일" },
  { question: "재미없고 지루하지만 보상이 주어지는 일 vs 재미있고 보람차지만 보상없는 일", options: ["보상", "보람"], score: [1, -1], category: "업무스타일" },

  // 개인과 조직
  { question: "인사평가 등급/등수 전사 공개 vs 비공개", options: ["공개", "비공개"], score: [1, -1], category: "개인과 조직" },
  { question: "프로젝트가 성공적으로 마무리되어 성과급을 준다는데, 기여도에 따라 다르게 받기 vs 똑같이 나눠받기", options: ["기여도에 따라", "N분의 1"], score: [1, -1], category: "개인과 조직" },
  { question: "업무능력 뛰어나지만 사회성 없는 동료 vs 업무능력 떨어지지만 사회성 좋은 동료", options: ["업무능력", "사회성"], score: [1, -1], category: "개인과 조직" },

  // 기타현안
  { question: "지금 자리에서 계속 일하기 vs 새로운 곳으로 이사가기", options: ["지금 자리", "새로운 곳"], score: [1, -1], category: "기타현안" },
  { question: "점심시간에도 건설적인 업무얘기 하는 동료 vs 업무시간에도 재밌지만 실없는 얘기 하는 동료", options: ["업무얘기", "실없는 얘기"], score: [1, -1], category: "기타현안" },
];

let currentQuestionIndex = 0;
let userChoices = [];
let categoryScores = {
  "인간관계": 0,
  "안정 변화": 0,
  "복지 돈": 0,
  "업무스타일": 0,
  "개인과 조직": 0,
  "기타현안": 0,
};

// 게임 시작 함수
function startGame() {
  const coverContainer = document.getElementById("cover-container");
  const gameContainer = document.getElementById("game-container");

  coverContainer.classList.add("hidden"); // 표지 숨기기
  gameContainer.classList.remove("hidden"); // 게임 화면 보이기

  loadQuestion(); // 첫 번째 질문 로드
}

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
    "안정 변화": 0,
    "복지 돈": 0,
    "업무스타일": 0,
    "개인과 조직": 0,
    "기타현안": 0,
  };
  usedQuestions = []; // 사용한 질문 초기화

  const coverContainer = document.getElementById("cover-container");
  const gameContainer = document.getElementById("game-container");
  coverContainer.classList.remove("hidden"); // 표지 보이기
  gameContainer.classList.add("hidden"); // 게임 화면 숨기기
}


// 결과 출력 함수
function showResults() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = ""; // 이전 내용을 초기화

  // 응답 결과 유형 계산
  let responseType = "";
  responseType += categoryScores["인간관계"] > 0 ? "E" : "I";
  responseType += categoryScores["안정 변화"] > 0 ? "S" : "C";
  responseType += categoryScores["복지 돈"] > 0 ? "W" : "M";
  responseType += categoryScores["업무스타일"] > 0 ? "P" : "A";
  responseType += categoryScores["개인과 조직"] > 0 ? "I" : "O";
  
  let resultMessages = `<h2>당신의 성향 분석 결과</h2>`;
  resultMessages += `<p><strong>응답 유형: ${responseType}</strong></p>`;
  
  // 인간관계
  if (categoryScores["인간관계"] > 0) {
    resultMessages += "<p>당신은 넓고 다양한 인간관계와 </p>";
  } else if (categoryScores["인간관계"] < 0) {
    resultMessages += "<p>당신은 좁고 긴밀한 인간관계와 </p>";
  } else {
    resultMessages += "<p>당신은 인간관계의 범위와 깊이에 균형과 </p>";
  }

  // 안정 변화
  if (categoryScores["안정 변화"] > 0) {
    resultMessages += "<p>안정을 추구하고,</p>";
  } else if (categoryScores["안정 변화"] < 0) {
    resultMessages += "<p>빠른 변화를 추구하고,</p>";
  } else {
    resultMessages += "<p>안정과 변화의 균형을 추구하고,</p>";
  }

  // 복지 돈
  if (categoryScores["복지 돈"] > 0) {
    resultMessages += "<p>금전적 보상보다 유무형의 복지제도를,</p>";
  } else if (categoryScores["복지 돈"] < 0) {
    resultMessages += "<p>복지보다 금전적 보상을,</p>";
  } else {
    resultMessages += "<p>복지와 금전적 보상의 균형을,</p>";
  }

  // 업무스타일
  if (categoryScores["업무스타일"] > 0) {
    resultMessages += "<p>수동적인 업무스타일을 선호합니다.</p>";
  } else if (categoryScores["업무스타일"] < 0) {
    resultMessages += "<p>능동적인 업무스타일을 선호합니다.</p>";
  } else {
    resultMessages += "<p>균형 있는 업무스타일을 선호합니다.</p>";
  }

  // 개인과 조직
  if (categoryScores["개인과 조직"] > 0) {
    resultMessages += "<p>그리고 조직보다 개인의 성과를 우선시하는군요!</p>";
  } else if (categoryScores["개인과 조직"] < 0) {
    resultMessages += "<p>그리고 개인보다 조직 전체의 성과를 우선시하는군요!</p>";
  } else {
    resultMessages += "<p>그리고 개인과 조직 간의 균형을 추구하는 성향입니다.</p>";
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
document.getElementById("start-button").onclick = startGame;
