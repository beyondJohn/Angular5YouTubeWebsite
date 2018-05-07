(function(){
    const fs = require('fs');
    fs.chmod('./src/assets', '775', function(err){
        if(err){
            console.log(err);
        }
    });
    fs.chmod('./src/assets/transcripts', '775', function(err){
        if(err){
            console.log(err);
        }
    });
    fs.chmod('./src/assets/transcripts/God_of_War_15_Minutes_of_Gameplay_-_PS4_Gameplay_Walkthrough__PS_Underground.json', '775', function(err){
        if(err){
            console.log(err);
        }
    });
    fs.readFile('./src/assets/transcripts/God_of_War_15_Minutes_of_Gameplay_-_PS4_Gameplay_Walkthrough__PS_Underground.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      const replacementString = '"';
      const replacementString1 = ': "';
      var resultHtml1 = data.replace(/\r\n"\r\n/g, replacementString );
      var resultHtml = resultHtml1.replace(/: "\r\n/g, replacementString1 );
      fs.writeFile('./src/assets/transcripts/God_of_War_15_Minutes_of_Gameplay_-_PS4_Gameplay_Walkthrough__PS_Underground.json', resultHtml, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
})();