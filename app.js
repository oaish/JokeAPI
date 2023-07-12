const express = require("express")
const https = require("https")
const {response} = require("express");
const app = express()
let joke = {
    categories: ["Any"],
    params: [
        "blacklistFlags=nsfw,religious,racist,sexist,explicit&safe-mode",
        "format=txt"
    ],
    options: {
        category: [ true, true, true, true ],
        blacklist: [ true, true, true, true ]
    }
}

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/', (req, res) => {
    https.get(`https://v2.jokeapi.dev/joke/${joke.categories.join(",")}?${joke.params.join("&")}`, (response) => {
        const userAgent = req.headers["user-agent"]
        let joke = ""
        response.on("data", (data) => {
            joke += data
        })
        response.on('end', () => {
            let view = ""
            if (userAgent.includes('Windows') || userAgent.includes('Mac') || userAgent.includes('Linux')) {
                view = "index"
            } else if (userAgent.includes('iPhone') || userAgent.includes('Android') || userAgent.includes('iPad')) {
                view = "mobile"
            }
            res.render(view, {jokeText: joke, options: joke.options})
        })
    }).on('error', () => {
        res.status(404).send('Joke Not Found')
    })

})

app.post('/joke', (req, res) => {
    joke = req.body;
    res.redirect('/')
})

app.get('/api', (req, res) => {
    res.json(joke.options)
})


app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000")
})
