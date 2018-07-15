'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const journalEntrySchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  day: String,
  startTime: {hour: Number, min: Number, period: String}, 
  endTime: {hour: Number, min: Number, period: String},
  body: {
    stretch: Boolean, 
    warmUp: Boolean,
    muscleGroup: String, 
    exercise: [{ name: String, weight: Number, reps: Number, sets: Number, completed: Boolean }], 
    cardio: [{ name: String, duration: String, intensity: String, calsBurned: Number, completed: Boolean }],
    coolDown: Boolean,
    review: { comments: String, rating: String}, 
  }, 
  progress: {
    weight: { measure: Number, uom: String }, 
    measurements: [{ location: String, measure: Number, uom: String}],
    picture: String
  }
})

journalEntrySchema.virtual('start').get(function() {
  return `${this.startTime.hour}:${this.startTime.min} ${this.startTime.period}`
});

journalEntrySchema.virtual('end').get(function() {
  return `${this.endTime.hour}:${this.endTime.min} ${this.endTime.period}`
});

journalEntrySchema.virtual('bodyWeight').get(function() {
  return `${this.weight.measure} ${this.weight.uom}`
})

journalEntrySchema.methods.serialize = function() {
  return {
    id: this._id, 
    date: this.date, 
    day: this.day,
    startTime: this.start, 
    endTime: this.end, 
    body: {
      stretch: this.stretch, 
      warmUp: this.warmUp, 
      muscleGroup: this.muscleGroup, 
      exercise: this.exercise,
      cardio: this.cardio, 
      coolDown: this.coolDown, 
      review: {
        comments: this.comments,
        rating: this.rating
      }
    }, 
    progress: {
      weight: this.bodyWeight,
      measurements: this.measurements,
      picture: this.picture
    }
  }
}