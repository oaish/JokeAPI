const textDoc = document.querySelector(".joke").textContent; // Replace with your desired text
const delay = 10; // Delay between each character (in milliseconds)
document.querySelector(".joke").textContent = ""
document.querySelector(".joke").style.visibility = "unset"
let index = 0;

async function getIt() {
    let opt = {}
    const rnd = await fetch('/api', {
        method: 'GET',
    }).then(res => res.json())
        .then(data => opt = data)

    function setOptions(opt) {
        const cardSet = document.querySelectorAll(".card")
        const category = opt.category;
        const blacklist = opt.blacklist;

        for (let i = 0; i < 4; i++) {
            category[i] ? cardSet[i].classList.add("clicked") : cardSet[i].classList.remove("clicked")
            blacklist[i] ? checkbox[i].setAttribute("checked", "true") : checkbox[i].setAttribute("checked", "false")
        }
    }

    setOptions(opt)
}

getIt()


function typeText() {
    let screenWidth = window.innerWidth;
    if (screenWidth > 800) {
        document.querySelector(".joke").style.fontSize = textDoc.length > 150 ? "3em" : "3.5em"
    } else {
        document.querySelector(".joke").style.fontSize = textDoc.length > 150 ? "1em" : "1.5em"
    }
    if (index < textDoc.length) {
        const typedTextElement = document.querySelector(".joke");
        typedTextElement.textContent += textDoc.charAt(index) === '.' ? '.\n' : textDoc.charAt(index);
        index++;
        setTimeout(typeText, delay);
    }
}

typeText();
