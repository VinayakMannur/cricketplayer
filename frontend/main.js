document.getElementById('submitPlayer').addEventListener('click',submitPlayer)
document.getElementById('searchPlayer').addEventListener('click', searchPlayer);

async function submitPlayer(e){
    e.preventDefault();
    
    const name = document.getElementById('PlayerName').value;
    const dob = document.getElementById('playerDob').value;
    const photoUrl = document.getElementById('playerUrl').value;
    const birthplace = document.getElementById('playerBirthplace').value;
    const career = document.getElementById('playerCareer').value;
    const matches = document.getElementById('playerMatches').value;
    const score = document.getElementById('playerScore').value;
    const fifties = document.getElementById('playerFifties').value;
    const centuries = document.getElementById('playerCenturies').value;
    const wickets = document.getElementById('playerWickets').value;
    const average = document.getElementById('playerAverage').value;

    console.log(name,dob,photoUrl,birthplace,career,matches,score,fifties,centuries,wickets,average);

    await axios.post('http://localhost:1500/savePlayer',{
        name: name,
        dob : dob,
        photoUrl: photoUrl,
        birthplace: birthplace,
        career: career,
        nummatches: matches,
        score: score,
        fifties: fifties,
        centuries: centuries,
        wickets: wickets,
        average: average
    })
        .then(responce => {
            // console.log(responce);
            alert(responce.data.msg)
            location.reload();
        })
        .catch(err => console.log(err));
}

async function searchPlayer(e){
    e.preventDefault();

    document.getElementById('infoTaking').style.display = 'none';
    document.getElementById('showingInfo').style.display = 'block';
    const parent = document.getElementById('showingPlayerInfo');

    const name = document.getElementById('searchPlace').value;

    let listv = []
    await axios.get(`http://localhost:1500/searchPlayer/${name}`)
        .then(responce => {
            // console.log(responce.data.result[0]);
            listv  = responce.data.result[0];
        })
        .catch(err => console.log(err))

    let val = [];

    Object.values(listv).forEach(ele =>{
        val.push(ele)
    })

    const span = document.createElement('sapn');
    span.textContent = val[0];
    span.setAttribute('id','spanId');
    span.style = 'display:none';
    parent.appendChild(span);

    const h3 = document.createElement('h3');
    h3.setAttribute('id','infoName');
    h3.textContent = val[1];
    parent.appendChild(h3);

    const img = document.createElement('img');
    img.setAttribute('src',`${val[3]}`);
    img.className = 'rounded';
    img.setAttribute('id','infoUrl');
    parent.appendChild(img);

    const p = document.createElement('p');
    p.setAttribute('id','infoDob');
    p.textContent = val[2];
    parent.appendChild(p);

    const h5 = document.createElement('h5');
    h5.setAttribute('id','infoBirthplace');
    h5.textContent = val[4];
    parent.appendChild(h5);

    const h6 = document.createElement('h6');
    h6.setAttribute('id','infoCareer');
    h6.textContent = val[5];
    parent.appendChild(h6);

    let arr = ["No. of Matches :", "Score :", "Fifties :","Centuries :", "Wickets :", "Average :"];
    let ids = ["infoMatches","infoScore","infoFifties","infoCenturies","infoWickets","infoAverage"];

    for(let i=6;i<=val.length;i++){
        const div = document.createElement('div');
        div.textContent = arr[i-6];
        const h6 = document.createElement('h6');
        h6.setAttribute('id',`${ids[i-6]}`);
        h6.textContent = val[i];
        div.appendChild(h6);
        parent.appendChild(div);
    }
    
    const button = document.createElement('button');
    button.setAttribute('type','submit');
    button.setAttribute('id','editPlayer');
    button.className = 'btn btn-outline-success';
    button.textContent = "Edit";
    parent.appendChild(button)
    document.getElementById('editPlayer').addEventListener('click',editSearchedPlayer);
}

async function editSearchedPlayer(){
    document.getElementById('showingInfo').style.display = 'none';
    document.getElementById('infoTaking').style.display = 'block';

    document.getElementById('PlayerName').value = document.getElementById('infoName').innerText;
    document.getElementById('playerDob').value = document.getElementById('infoDob').innerText;
    document.getElementById('playerUrl').value = document.getElementById('infoUrl').getAttribute("src");
    document.getElementById('playerBirthplace').value = document.getElementById('infoBirthplace').innerText;
    document.getElementById('playerCareer').value = document.getElementById('infoCareer').innerText;
    document.getElementById('playerMatches').value = document.getElementById('infoMatches').innerText;
    document.getElementById('playerScore').value = document.getElementById('infoScore').innerText;
    document.getElementById('playerFifties').value = document.getElementById('infoFifties').innerText;
    document.getElementById('playerCenturies').value = document.getElementById('infoCenturies').innerText;
    document.getElementById('playerWickets').value = document.getElementById('infoWickets').innerText;
    document.getElementById('playerAverage').value = document.getElementById('infoAverage').innerText;
    
    const el = document.getElementById('formId');
    document.getElementById('submitPlayer').style.display = 'none';
    const but = document.createElement('button');
    but.setAttribute('type','submit');
    but.className='btn btn-primary';
    but.setAttribute('id','update')
    but.textContent = "Save";
    el.appendChild(but);

    document.getElementById('update').addEventListener('click', updatePlayer);
}

async function updatePlayer(){

    const id = document.getElementById('spanId').innerText;
    await axios.post('http://localhost:1500/update',{
        id: id,
        name: document.getElementById('PlayerName').value,
        dob:  document.getElementById('playerDob').value,
        photoUrl: document.getElementById('playerUrl').value,
        birthplace: document.getElementById('playerBirthplace').value,
        career: document.getElementById('playerCareer').value,
        nummatches: document.getElementById('playerMatches').value,
        score: document.getElementById('playerScore').value,
        fifties: document.getElementById('playerFifties').value,
        centuries: document.getElementById('playerCenturies').value,
        wickets: document.getElementById('playerWickets').value,
        average: document.getElementById('playerAverage').value
    })
        .then(result =>{
            // console.log(result);
            alert(result.data.msg)
        })
        .catch(err => console.log(err));
}
