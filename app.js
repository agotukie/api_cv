var apiU = ''
var skills = []
var answers = document.getElementById('skillsAnswer');
var messageError = document.getElementById('skillsError');
var noLetter = document.getElementById('noLetter');
var noSkill = document.getElementById('noSkill');


function getAll() {
    apiU = 'https://akcv.herokuapp.com/api2/'
    skills = []
    noLetter.setAttribute('style','display:none');
    fromCV(apiU)
}


function getSome() {
    var selectedLetters  = document.getElementById('someLetters')
    var onlyLetters = selectedLetters.value.split('').filter(char => /[a-zA-Z]/.test(char));

    if (onlyLetters.length) {
        var letterInput = onlyLetters.join(',')
        apiU = 'https://akcv.herokuapp.com/api2/' + letterInput;
        skills = []
        fromCV(apiU)
    } else {
        noLetter.setAttribute('style','display:');
        answers.setAttribute('style','display:none');
    }
}


function fromCV(apiUrl) {
    document.querySelector('#cardData').setAttribute('style','display:')
    noLetter.setAttribute('style','display:none')
    
    $.ajax({
        url: apiUrl, 
    }).done(function(response){
        console.log("data: ", response);
        response.forEach(e => {
            //console.log(e.name)
            skills.push(e.name)
        })
        messageError.setAttribute('style','display:none')
        answers.setAttribute('style','display:')
        if (skills.length) {
            answers.querySelector('div').innerText = skills.join(', ');
            answers.querySelector('div').setAttribute('style','display:')
            noSkill.setAttribute('style','display:none');
        } else {
            answers.querySelector('div').setAttribute('style','display:none');
            noSkill.setAttribute('style','display:');
        }
        
        document.querySelector('#cardData').setAttribute('style','display:none');
    }).fail(function(error){      
        console.log(error, "error");
        document.querySelector('#cardData').setAttribute('style','display:none');
        messageError.setAttribute('style','display:');
        answers.setAttribute('style','display:none');
    });
}

