const express = require("express");
const router = express.Router();
const database = require("../server.js")
router.get("/authorization",(req,res) =>{
res.send(`<div class="container">
<h1>403</h1>
<p>access not granted</p>
</div>
<div style="text-align: center;">
</div>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Nova+Mono');
:root {
--font-header: 'Nova Mono', monospace;
--font-text: 'Open Sans', sans-serif;
--color-theme: #F1EEDB;
--color-bg: #282B24;
}
* {
box-sizing: border-box;
margin: 0;
padding: 0;
}
body {
  margin-top: 100px;
width: 100%;
font-family: var(--font-text);
color: var(--color-theme);
background: var(--color-bg);
}
.container {
text-align: center;
margin: 1rem 0.5rem 0;
}
.container h1 {
font-family: var(--font-header);
font-size: calc(4rem + 2vw);
text-transform: uppercase;
}
.container p {
text-transform: uppercase;
letter-spacing: 0.2rem;
font-size: 2rem;
margin: 1.5rem 0 3rem;
}
a{
  color: #88867a;
  opacity: 2;
  text-decoration: none;
}
  a:hover{
      text-decoration: none;
      opacity: 1;
      color: #F1EEDB;
      transition-duration:0.25s;
  }
</style>
`);
})
module.exports = router;