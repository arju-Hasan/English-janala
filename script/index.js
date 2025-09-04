const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((response) => response.json())
      .then((json) => displayLessons(json.data));
       
};
const removeActiveClass = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("btn-active"));
};

const loadLevelWords = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        removeActiveClass(); // remove active class from all buttons
        const clickedButton = document.getElementById(`lesson-btn-${id}`);
        clickedButton.classList.add("btn-active"); // add active class to the clicked button
        displayWords(json.data);
      });
};

const loadWordDetails =   async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    const response = await fetch(url);
    const details = await response.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (details) => {
    console.log(details);
    const detailsbox = document.getElementById("detailsContainer");
    detailsbox.innerHTML = `
         <div>
                <h3 class="font-bold text-2xl">${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation} )</h3>
            </div>
            <div>
                <h3 class="font-bold">Meaning </h3>
                <p class="py-4">${details.meaning}</p>
            </div>
            <div>
                <h3 class="font-bold">Example</h3>
                <p class="py-4">${details.sentence}</p>
            </div>
             <div>
                <h3 class="font-bold">সমার্থক শব্দ গুলো</h3>
                <span class="btn">${details.synonyms[0]}</span>
                <span class="btn">${details.synonyms[1]}</span>
                <span class="btn">${details.synonyms[2]}</span>
            </div> 
    `;
    document.getElementById("word_modal").showModal();
};




const displayWords = (words) => {
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = '';

  if(words.length === 0){
    wordContainer.innerHTML = `
      <div class="bg-white col-span-3 text-center rounded-lg p-5 space-y-3">
      <img class="mx-auto" src="./assets/alert-error.png" alt="alert-error">
        <p class="font-semibold text-xl text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-semibold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
  }

  words.forEach((word) => {
      console.log(word);
      const wordDiv = document.createElement("div");
      wordDiv.innerHTML = `
          <div class="bg-white p-5 rounded-lg shadow text-center py-10 px-5">

        <h2 class="text-2xl font-bold my-3">${
          word.word ? word.word : "শব্দ পাওয়া যায় নি"
        }</h2>

        <p class="font-semibold">Meaning /Pronounciation</p>

        <div class="text-2xl font-bold my-5 font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"
        } / ${
        word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"
      }"</div>

        <div class="flex flex-row justify-between items-center">
            <button onclick="loadWordDetails(${word.id})" class="btn font-bold">
                <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
    </div>
      `;
      wordContainer.appendChild(wordDiv);
  });
};

const displayLessons = (lessons) => {
    // 1. get the container and empty
    const lavaleContainer = document.getElementById("lavale-container");
    lavaleContainer.innerHTML = '';
    // get into every lesson
    for (const lesson of lessons) {
        // create a div 
        const btnDiv = document.createElement("div");
        // btnDiv.classList.add("lesson");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> 
            <i class="fa-solid fa-book-open"></i> 
            Lesson- ${lesson.level_no}</button>
        `;
        lavaleContainer.appendChild(btnDiv);
    }
};
loadLesson();