var Workout = require('../models/workoutModel.js');
var bodyParser = require('body-parser');

module.exports = function(app){
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //Username get all workouts
    app.get('/api/workouts/:uname', function(req, res) {
        
        Workout.find({ username: req.params.uname }, 
        function(err, workout) {
            if (err) throw err;          
            res.send(workout);
        });      
    });

        app.post('/api/workout/createLifting',function(req,res){ 
            var newWorkout = Workout({
                username:"test",
                workoutName: req.body.workoutName,
                reps: req.body.reps,
                weight: req.body.weight,
            });
            newWorkout.save(function(err){
                if(err)throw err;
                res.send('New Lifting Workout Created');
            });
        });
    
    app.post('/api/workout/editLifting',function(req,res){
        if (req.body.id){
            Workout.findByIdAndUpdate(req.body.id, {
              workoutName: req.body.workoutName,
              reps: req.body.reps,
              weight: req.body.weight},
                function(err,workout){
                if (err) throw err;
                res.send('Lifting Workout Updated');
            })
        };
    });

        app.post('/api/workout/createRunning',function(req,res){
            var newWorkout = Workout({
                username:"test",
                workoutName: "Run",
                distance: req.body.distance,
                time: req.body.time
            });
            newWorkout.save(function(err){
                if(err)throw err;
                res.send('New Running Workout Created');
            });
        });

        app.post('/api/workout/editRunning',function(req,res){
        if (req.body.id){
            Workout.findByIdAndUpdate(req.body.id, {
              distance: req.body.distance,
              time: req.body.time},
                function(err,workout){
                if (err) throw err;
                res.send('Running Workout Updated');
            })
        };
    });

    
    //deletes a workout
    app.delete('/api/workout/remove/:id', function(req, res) {
        console.log(req.params.id);
        Workout.findByIdAndRemove(req.params.id, function(err) {
            if (err) throw err;
            res.send('Workout Deleted');
        })
        
    });
}
