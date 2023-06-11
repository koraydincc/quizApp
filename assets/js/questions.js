let questionCount = document.getElementById("question-count");
let timer = document.getElementById("timer-right");
let question = document.getElementById("questions");
let replyOne = document.getElementById("reply-one");
let replyTwo = document.getElementById("reply-two");
let replyThree = document.getElementById("reply-three");
let replyFour = document.getElementById("reply-four");
let button = document.getElementById("button");
let replyContainer = document.getElementById("reply-container");
let numberQuestion = document.getElementById("number-question");

let newArray = [],
  counter = 0;

const quizApp = {
  options: "",
  questionArray: [
    {
      id: 0,
      question: "JavaScripti hangi HTML öğesinin içine koyuyoruz?",
      options: ["scripting", "js", "script", "javascript"],
      reply: "script",
    },
    {
      id: 1,
      question: "JavaScript hangi tür bir dildir?",
      options: [
        "Yüksek seviye diller",
        "Düşük seviye diller",
        "Orta seviye diller",
        "Hem yüksek hem de düşük seviye diller",
      ],
      reply: "Yüksek seviye diller",
    },
    {
      id: 2,
      question:
        "JavaScript'te değişkenleri tanımlamak için hangi anahtar kelimeyi kullanırız?",
      options: ["var", "let", "const", "all of the above"],
      reply: "all of the above",
    },
    {
      id: 3,
      question: "JavaScript'te döngülerle ilgili hangi ifade yanlıştır?",
      options: [
        "for döngüsü, belirli bir sayıda tekrarlamak için kullanılır.",
        "while döngüsü, belirli bir koşul sağlandığı sürece tekrarlamak için kullanılır.",
        "do-while döngüsü, en az bir kez döngünün içeriğini çalıştırır.",
        "foreach döngüsü, bir dizi üzerinde gezinmek için kullanılır.",
      ],
      reply: "for döngüsü, belirli bir sayıda tekrarlamak için kullanılır.",
    },
    {
      id: 4,
      question: "JavaScript'te hangi işlem önceliği en yüksektir?",
      options: [
        "Aritmetik operatörler",
        "Atama operatörleri",
        "Kıyas operatörleri",
        "Mantıksal operatörler",
      ],
      reply: "Aritmetik operatörler",
    },
    {
      id: 5,
      question:
        "JavaScript'te hangi metot, bir dizinin sonuna yeni bir öğe ekler?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      reply: "push()",
    },
    {
      id: 6,
      question:
        "JavaScript'te hangi metot, bir diziden belirli bir öğeyi kaldırır?",
      options: ["splice()", "slice()", "concat()", "join()"],
      reply: "splice()",
    },
    {
      id: 7,
      question:
        "JavaScript'te hangi metot, bir dizedeki belirli bir karakterin indeksini döner?",
      options: ["indexOf()", "charAt()", "substring()", "replace()"],
      reply: "indexOf()",
    },
    {
      id: 8,
      question:
        "JavaScript'te hangi metot, bir dizeyi büyük harflere dönüştürür?",
      options: ["toUpperCase()", "toLowerCase()", "trim()", "split()"],
      reply: "toUpperCase()",
    },
    {
      id: 9,
      question:
        "JavaScript'te hangi metot, bir dizenin belirli bir bölümünü yeni bir dize olarak döner?",
      options: ["slice()", "splice()", "substring()", "replace()"],
      reply: "substring()",
    },
  ],

  questionHandle: function () {
    event.preventDefault();

    this.handlequestions();
    this.questionCounter();

    if (this.handleQuestionsCounter()) {
      return false;
    }

    this.readQuestion();
  },

  newArray: [],
  counter: 0,

  handlequestions: function () {
    this.questionArray.forEach((item) => {
      if (item.id == counter) {
        this.newArray.push({
          id: item.id,
          question: item.question,
          options: item.options,
          reply: item.reply,
        });
      }
    });

    this.readQuestion();
    console.log(this.newArray);
  },
  //find koşulu sağlayan dizideki ilk öğeyi bulur
  readQuestion: function () {
    let currentQuestion = this.newArray.find((item) => {
      if (item.id == counter) {
        return true;
      } else {
        return false;
      }
    });

    if (currentQuestion) {
      question.innerHTML = currentQuestion.question;

      this.readOptions(currentQuestion);
    } else {
      counter++;
      replyContainer.style.display = "none";
      button.innerHTML = "Sonuçları Gör.";
      question.innerHTML = "Sorular Tamamlandı!";
    }
  },

  readOptions: function (currentQuestion) {
    // console.log(currentQuestion.options);
    this.options = "";

    currentQuestion.options.forEach((item, index) => {
      this.options += `
              <div class="reply-option">
                <input
                  type="radio"
                  onclick="quizApp.selectCurrentChoose(${currentQuestion.id},'${item}')"
                  id="answer-${index}"
                  value="${item}"
                  name="answer"
                />
                <label for="answer-${index}">${item}</label>
              </div>
        `;
    });

    replyContainer.innerHTML = this.options;
  },

  selectCurrentChoose: function (queryId, answer) {
    // soruyu bul
    let queryData = this.questionArray.find((item) => item.id == queryId);

    // sorudaki doğru cevapla kullanıcının verdiği cevabı karşılaştır
    let isQuestionEqual = queryData.reply == answer;

    console.log(isQuestionEqual);
  },

  handleQuestionsCounter: function () {
    if (this.counter < this.newArray.length) {
      if (!this.newArray[counter]) return false;

      question.innerHTML = this.newArray[counter].question;

      counter++;
      return true;
    } else {
      return false;
    }
  },
  questionCounter: function () {
    if (counter <= 10) {
      numberQuestion.innerHTML = `${counter + 1}/10`;
    } else {
      numberQuestion.innerHTML = "";
    }
  },
  handleAnswer: function () {
    // let handleOptions =
  },
  handleTimer: function () {},
  successMessage: function (message) {
    Swal.fire("Testi Bitirdiniz!", message, "success");
  },
};

window.onload = function () {
  quizApp.questionHandle();

  document.addEventListener("click", function (e) {
    const target = e.target;

    if (e.target.className == "reply-option") {
      let _input = target.querySelectorAll("input")[0];

      if (_input) {
        _input.click();
      }
    }
  });
};
