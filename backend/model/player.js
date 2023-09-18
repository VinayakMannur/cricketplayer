const db = require('../util/database');

module.exports = class Player{
    constructor(id, name, dob, photoUrl, birthplace, career, nummatches, score, fiftes, centuries, wickets, average){
        this.id = id
        this.name = name;
        this.dob = dob;
        this.photoUrl = photoUrl;
        this.birthplace = birthplace;
        this.career = career;
        this.nummatches = nummatches;
        this.score = score;
        this.fiftes = fiftes;
        this.centuries = centuries;
        this.wickets = wickets;
        this.average = average;
    }

    save(){
        if(!this.id){
            return db.execute('INSERT INTO player (name, dob, photoUrl, birthplace, career, nummatches, score, fifties, centuries, wickets, average) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [this.name, this.dob, this.photoUrl, this.birthplace, this.career, this.nummatches, this.score, this.fiftes, this.centuries, this.wickets, this.average]);
        }
        else{
            // console.log(this.id);
            return db.execute('UPDATE player SET name=?, dob=?, photoUrl=?, birthplace=?, career=?, nummatches=?, score=?, fifties=?, centuries=?, wickets=?, average=? WHERE id=?',
            [this.name, this.dob, this.photoUrl, this.birthplace, this.career, this.nummatches, this.score, this.fiftes, this.centuries, this.wickets, this.average, this.id]);
        }
    }

    static searchByName(name){
        return db.query('SELECT * FROM player WHERE name=?',[name]);
    }

}