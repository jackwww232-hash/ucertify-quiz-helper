// ==UserScript==
// @name         ucertify-quiz-helper
// @version      2.0.0
// @description  ucertify-quiz-helper
// @author       0guanhua0@gmail.com
// @include      *ucertify*
// @require      https://raw.githubusercontent.com/0guanhua0/ucertify-quiz-helper/refs/heads/main/db.js
// ==/UserScript==

(function () {
  "use strict";

  // https://aistudio.google.com/app/apikey
  // update MY_API_KEY
  const GEMINI_API_KEY = "MY_API_KEY";

  let lastProcessedQuestion = null;

  function normalizeText(text) {
    return text
      .replace(/ /g, " ")
      .replace(/–/g, "-")
      .replace(/−/g, "-")
      .replace(/’/g, "'")
      .replace(/“/g, '"')
      .replace(/”/g, '"');
  }

  function matchKey(question, quiz) {
    for (let key in quiz) {
      if (question.includes(key)) {
        return key;
      }
    }
    return null;
  }

  function highlightAnswers(answersToHighlight, optionElements) {
    answersToHighlight.forEach((value) => {
      for (let element of optionElements) {
        let text = normalizeText(element.innerText.trim());
        if (text === value) {
          element.style.backgroundColor = "#00ff00";
          console.log("Highlighting answer:", value);
        }
      }
    });
  }

  async function askGemini(question, options) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "MY_API_KEY") {
      console.error("no Gemini API Key.");
      return [];
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const prompt = `
      Respond exact text of the correct option(s).
      If multiple options, list each one on a new line.

      Question:
      ${question}

      Options:
      ${options.join("\n")}
    `;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
        generationConfig: {
          temperature: 0,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.error.message);
        return [];
      }

      const data = await response.json();
      const aiResponseText = data.candidates[0].content.parts[0].text;

      return aiResponseText
        .trim()
        .split("\n")
        .map((ans) => ans.trim())
        .filter(Boolean);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function runHelper() {
    const questionElement = document.querySelector(
      '[data-itemtype="question"]',
    );
    if (!questionElement) {
      console.log("no question");
      return;
    }

    const currentQuestion = normalizeText(questionElement.innerText.trim());
    console.log(currentQuestion);

    lastProcessedQuestion = currentQuestion;

    const optionElements = document.querySelectorAll("#item_answer seq");
    if (optionElements.length === 0) {
      console.log("no answer");
      return;
    }
    const options = Array.from(optionElements).map((el) =>
      normalizeText(el.innerText.trim()),
    );

    console.log(options);

    const matchingKey = matchKey(currentQuestion, quiz);

    if (matchingKey) {
      console.log("Found match in local DB.");
      const dbAnswers = quiz[matchingKey];
      highlightAnswers(dbAnswers, optionElements);
    } else {
      console.log("No match in DB, asking Gemini AI...");
      const aiAnswers = await askGemini(currentQuestion, options);

      if (aiAnswers.length > 0) {
        console.log("Gemini AI suggests:", aiAnswers);
        highlightAnswers(aiAnswers, optionElements);
      } else {
        console.log("no answer from ai");
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    const questionElement = document.querySelector(
      '[data-itemtype="question"]',
    );
    const currentQuestionTextOnPage = questionElement
      ? normalizeText(questionElement.innerText.trim())
      : null;

    if (
      currentQuestionTextOnPage &&
      currentQuestionTextOnPage !== lastProcessedQuestion
    ) {
      console.log("new question, run helper");
      setTimeout(() => {
        runHelper();
      }, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  window.addEventListener("load", function () {
    console.log("Page loaded, running quiz logic");
    setTimeout(runHelper, 100);
  });
})();
