const Player = require('../model/player');

exports.savePlayer = (req, res, next) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const photoUrl = req.body.photoUrl;
    const birthplace = req.body.birthplace;
    const career = req.body.career;
    const nummatches = req.body.nummatches;
    const score = req.body.score;
    const fifties = req.body.fifties;
    const centuries = req.body.centuries;
    const wickets = req.body.wickets;
    const average = req.body.average;

    const player = new Player(null,name, dob, photoUrl, birthplace, career, nummatches, score, fifties, centuries, wickets, average);

    player.save()
        .then(result => {
            res.json({msg:"Player saved successfully!!"})
        })
        .catch(err => console.log(err));
}

exports.getPlayer =(req, res, next) => {
    const name = req.params.name;

    Player.searchByName(name)
        .then(result => {
            // console.log(result);
            res.json({result:result[0]});
        })
        .catch(err => console.log(err));
}

exports.updatePlayer = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const dob = req.body.dob;
    const photoUrl = req.body.photoUrl;
    const birthplace = req.body.birthplace;
    const career = req.body.career;
    const nummatches = req.body.nummatches;
    const score = req.body.score;
    const fifties = req.body.fifties;
    const centuries = req.body.centuries;
    const wickets = req.body.wickets;
    const average = req.body.average;

    const player = new Player(id, name, dob, photoUrl, birthplace, career, nummatches, score, fifties, centuries, wickets, average);
    // console.log(player);
    player.save()
        .then(result => {
            res.json({msg:"Player updated successfully!!"})
        })
        .catch(err => console.log(err));
}