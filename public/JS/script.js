const h4 = $(".hh")
const card = $(".card")
const btn = $("button")
const checkbox = document.querySelectorAll("input[type='checkbox']")
let blacklistFlags = []
let categories = ["Programming", "Miscellaneous", "Pun", "Christmas", "Dark", "Spooky", "Any"]
let text = ""

for (let i = 0; i < card.length; i++) {
    card.eq(i).on('click', () => {
        card.eq(i).toggleClass("clicked")
        text = h4.eq(i).text()

        const toggleCategory = (category) => {
            const index = categories.indexOf(category)
            index !== -1 ? categories.splice(index, 1) : categories.push(category)
        }
        switch (text) {
            case "Spooky":
                toggleCategory("Spooky")
                break;
            case "Code":
                toggleCategory("Programming")
                break;
            case "Misc":
                toggleCategory("Miscellaneous")
                toggleCategory("Pun")
                toggleCategory("Christmas")
                break;
            case "Dark":
                toggleCategory("Dark")
                break;
        }
    })
}

$(document).on('click', () => {
    let cnt = 0;
    for (let i = 0; i < card.length; i++) {
        card.eq(i).hasClass("clicked") ? ++cnt : cnt;
    }
    if (cnt === 4 && !categories.includes("Any")) {
        categories.push("Any")
    } else if (categories.includes("Any")) {
        categories.splice(categories.indexOf('Any'), 1)
    }
})

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('click', () => {

        if (checkbox[i].checked) {
            switch (checkbox[i].value) {
                case "nsfw":
                    blacklistFlags.push("nsfw", "explicit");
                    break;
                case "religious":
                    blacklistFlags.push("religious");
                    break;
                case "racist":
                    blacklistFlags.push("racist");
                    break;
                case "sexist":
                    blacklistFlags.push("sexist");
                    break;
            }
        } else {
            switch (checkbox[i].value) {
                case "nsfw":
                    blacklistFlags.splice(blacklistFlags.indexOf(checkbox[i].value), 2);
                    break;
                case "religious":
                case "racist":
                case "sexist":
                    blacklistFlags.splice(blacklistFlags.indexOf(checkbox[i].value), 1);
                    break;
            }
        }
    })
    if (checkbox[i].checked) {
        switch (checkbox[i].value) {
            case "nsfw":
                blacklistFlags.push("nsfw", "explicit");
                break;
            case "religious":
                blacklistFlags.push("religious");
                break;
            case "racist":
                blacklistFlags.push("racist");
                break;
            case "sexist":
                blacklistFlags.push("sexist");
                break;
        }
    }
}


function getOptions() {
    const cardGet = document.querySelectorAll(".card")
    let code = cardGet[0].classList.contains("clicked"),
        misc = cardGet[1].classList.contains("clicked"),
        dark = cardGet[2].classList.contains("clicked"),
        spooky = cardGet[3].classList.contains("clicked")
    return {
        category: [
            code, misc, dark, spooky
        ],
        blacklist: [
            checkbox[0].checked,
            checkbox[1].checked,
            checkbox[2].checked,
            checkbox[3].checked
        ]
    }
}

btn.on("click", async (event) => {
    event.preventDefault();
    let opt = getOptions()
    let blF = blacklistFlags.includes("nsfw") && !categories.includes("Any") ?
        "blacklistFlags=" + blacklistFlags.join(',') + "&safe-mode" :
        "blacklistFlags=" + blacklistFlags.join(',')
    let ctg = categories.includes("Any") ? ["Any"] : categories
    let blf = blF.length > 0 ? blF : ""
    let joke = {
        categories: ctg,
        params: [
            blf,
            "format=txt"
        ],
        options: opt
    };
    const res = await fetch('/joke', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }).then(response => {
        if (response.ok) {
            location.reload();
        } else {
            console.log(response)
        }
    })
        .catch(error => {
            console.log(error)
        });
});

