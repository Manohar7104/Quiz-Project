const questions = {
  HTML: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Markup Language",
        "Hyperlinks and Text Markup",
        "Home Tool Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      id: 2,
      question: "Which tag is used for a paragraph in HTML?",
      options: ["<p>", "<para>", "<text>", "<span>"],
      answer: "<p>",
    },
    {
      id: 3,
      question: "Which attribute is used to provide a link in HTML?",
      options: ["href", "src", "link", "ref"],
      answer: "href",
    },
    {
      id: 4,
      question: "Which element is used to create a list with bullets?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: "<ul>",
    },
    {
      id: 5,
      question: "Where do you place the title of the web page?",
      options: ["<title>", "<head>", "<header>", "<body>"],
      answer: "<title>",
    },
  ],
  CSS: [
    {
      id: 1,
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      id: 2,
      question: "Which property is used to change text color?",
      options: ["color", "font", "text-color", "foreground"],
      answer: "color",
    },
    {
      id: 3,
      question: "How do you select an element with id 'main' in CSS?",
      options: ["#main", ".main", "main", "*main"],
      answer: "#main",
    },
    {
      id: 4,
      question: "Which property controls the space inside an element?",
      options: ["padding", "margin", "border", "spacing"],
      answer: "padding",
    },
    {
      id: 5,
      question: "Which display value makes elements line up horizontally?",
      options: ["inline", "block", "none", "list"],
      answer: "inline",
    },
  ],
  JavaScript: [
    {
      id: 1,
      question:
        "Which keyword is used to declare a variable in modern JavaScript?",
      options: ["let", "var", "dim", "set"],
      answer: "let",
    },
    {
      id: 2,
      question: "Which method logs output to the browser console?",
      options: ["console.log()", "print()", "echo()", "log()"],
      answer: "console.log()",
    },
    {
      id: 3,
      question: "How do you add a comment in JavaScript?",
      options: ["// comment", "/* comment */", "# comment", "Both A and B"],
      answer: "Both A and B",
    },
    {
      id: 4,
      question: "Which symbol is used for strict equality comparison?",
      options: ["===", "==", "=", "!=="],
      answer: "===",
    },
    {
      id: 5,
      question: "What is the output type of 'typeof 5'?",
      options: ["number", "string", "object", "integer"],
      answer: "number",
    },
  ],
  Python: [
    {
      id: 1,
      question: "Which symbol is used to start a comment in Python?",
      options: ["#", "//", "/*", "--"],
      answer: "#",
    },
    {
      id: 2,
      question: "Which function prints output to the console in Python?",
      options: ["print()", "echo()", "console.log()", "printf()"],
      answer: "print()",
    },
    {
      id: 3,
      question: "Which keyword is used to define a function in Python?",
      options: ["def", "function", "fun", "func"],
      answer: "def",
    },
    {
      id: 4,
      question: "Which data type holds ordered, immutable values?",
      options: ["tuple", "list", "set", "dict"],
      answer: "tuple",
    },
    {
      id: 5,
      question: "How do you create a list in Python?",
      options: ["[1,2,3]", "(1,2,3)", "{1,2,3}", "<1,2,3>"],
      answer: "[1,2,3]",
    },
  ],
};

module.exports = questions;
