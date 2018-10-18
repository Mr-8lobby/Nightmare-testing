var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: false })
var pages = 1702
var fs = require('fs');
var stream = fs.createWriteStream("out.txt");

nightmare
  .goto('https://www.linkedin.com/')
  .type('#login-email', )
  .type('#login-password', '')
  .click('#login-submit')
  .wait('#voyager-feed')
var runNext = function (i) {
  if (i < 41 ) {
    nightmare.goto('https://www.linkedin.com/' + (i*25))
    nightmare.wait('.search-result')
    nightmare.wait(2000)
    nightmare.evaluate(() => {
      var output = '';
      var searchResult = document.querySelectorAll('.search-result')
      var currentPosition = document.querySelectorAll('.search-result .row-content.curr-positions'); 
      var topCard = document.querySelectorAll('.search-result .top-card'); 
      var topCardLen = topCard.length
      var currPosLen = currentPosition.length

      for (i = 0; i < topCardLen; i++){
        output += "\n" + topCard[i].querySelector('.name').innerText.replace(/(\n)/gm,'');
        title = topCard[i].querySelector('div.top-card-info > p.headline')
        if (title !== null){
          output += ";;" + topCard[i].querySelector('div.top-card-info > p.headline').innerText.replace(/(\n)/gm,'');
        }else{
          output += ";;"
        }
        curr_pos = searchResult[i].querySelector('.row-content.curr-positions')
        if(curr_pos !== null){
          output += ";;" + curr_pos.innerText.replace(/(\n)/gm,'');
        }else{
          output += ";;"
        }
      }   
        return output
    })  
    nightmare.then(result => {
      console.log('**************START*********** = ' + (i*25))
      console.log(result)
      stream.write(result)
      nightmare.run(function() { runNext(i+1)})
    })
    nightmare.catch(error => {
      console.error('Search failed:', error)
    })
  }else{
    nightmare.end()
    nightmare.then()
    nightmare.catch()
  }
}
runNext(0)
