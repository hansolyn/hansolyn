const questions = [
  { question: "1등상금 200만원 주는 재미있는 토요일 단합대회 vs 안 받고 안 하기", options: ["한다", "안 한다"] },
  { question: "다양한 부서 사람들과 교류하며 지내기 vs 업무 연관된 소수의 사람만 친하게 지내기", options: ["다수", "소수"] },
  { question: "조용한 사무실 vs 시끌벅적한 사무실", options: ["조용", "시끌"] },
  { question: "식권(회사근처 편의점, 카페, 식당 사용가능) 연320만원 vs 연봉에 식대(비과세) 240만원", options: ["식권", "연봉"] },
  { question: "다양한 복지가 있는 회사 vs 복지는 없지만 연봉이 높은 회사", options: ["복지", "연봉"] },
  { question: "주4일제 하고 월급 적게 받기 vs 지금처럼 하기", options: ["시간", "돈"] },
  // 안정선호 변화선호
  { question: "처음 세운 계획대로 하기 vs 트렌드에 맞춘 잦은 변화", options: ["계획", "변화"] },
  { question: "낮지만 꾸준한 연봉인상률 vs 평가에 따라 매년 달라지는 연봉인상률", options: ["고정인상률", "변동인상률"] },
  { question: "주기적으로 정해진 날에만 보고하기 vs 이슈 있을 때마다 보고하기", options: ["정기보고", "수시보고"] },
  // 업무스타일 객체적 주체적
  { question: "지시받은 일만 하기 vs 내가 주도해서 하기", options: ["지시", "주도"] },
  { question: "하나하나 보고해서 컨펌받고 결과에 책임 안 지기 vs 착수보고만 하고 결과에 책임지기", options: ["컨펌", "책임"] },
  { question: "보람없지만 보상있는 일 vs 보람차지만 보상없는 일", options: ["보상", "보람"] }
  // 개인주의 공동체주의
  { question: "평가등급/등수 전사 공개 vs 비공개", options: ["공개", "비공개"] },
  { question: "성과급 기여도에 따라 다르게 받기 vs 다같이 나눠받기", options: ["N분의 1", "기여도에 따라"] },
  { question: "일 잘하지만 사회성 없는 동료 vs 일 못하지만 사람좋은 동료", options: ["일", "사람"] },
  // 기타 현안
  { question: "지금 자리에서 계속 일하기 vs 새로운 곳으로 이사가기", options: ["계속", "이사"] },  
  { question: "점심 시간에도 건설적인 업무얘기 하는 동료 vs 업무시간에도 웃기지만 실없는 얘기 하는 동료", options: ["업무얘기", "실없는 얘기"] },  
];

const questionElement = document.querySelector(".question");
const option1Button = document.getElementById("option1");
const option2Button = document.getElementById("option2");

// 랜덤으로 질문 선택
function loadQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const currentQuestion = questions[randomIndex];
  
  questionElement.textContent = currentQuestion.question;
  option1Button.textContent = currentQuestion.options[0];
  option2Button.textContent = currentQuestion.options[1];
}

let currentQuestionIndex = 0;
const userChoices = [];

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  option1Button.querySelector("span").textContent = currentQuestion.options[0];
  option2Button.querySelector("span").textContent = currentQuestion.options[1];

  // data-choice 속성 설정
  option1Button.setAttribute("data-choice", currentQuestion.options[0]);
  option2Button.setAttribute("data-choice", currentQuestion.options[1]);
}

function recordChoice(choice) {
  userChoices.push(choice);
  currentQuestionIndex++;
  loadQuestion();
}

option1Button.addEventListener("click", () => {
  recordChoice(option1Button.getAttribute("data-choice"));
});
option2Button.addEventListener("click", () => {
  recordChoice(option2Button.getAttribute("data-choice"));
});

function showResults() {
  const gameContainer = document.querySelector(".game");
  gameContainer.style.display = "none";

  const resultContainer = document.createElement("div");
  resultContainer.innerHTML = `<h2>당신의 선택 결과</h2>`;

  const stats = userChoices.reduce((acc, choice) => {
    acc[choice] = (acc[choice] || 0) + 1;
    return acc;
  }, {});

  for (const [choice, count] of Object.entries(stats)) {
    resultContainer.innerHTML += `<p>${choice} 선택</p>`;
  }

  const restartButton = document.createElement("button");
  restartButton.textContent = "다시 시작하기";
  restartButton.addEventListener("click", () => {
    gameContainer.style.display = "block";
    resultContainer.remove();
    currentQuestionIndex = 0;
    userChoices.length = 0;
    loadQuestion();
  });

  resultContainer.appendChild(restartButton);
  document.body.appendChild(resultContainer);
}

loadQuestion();
