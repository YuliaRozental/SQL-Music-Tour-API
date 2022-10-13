'use strict'
const {
  Model, BelongsToMany
} = require('sequelize')
const meetgreet = require('./meetgreet')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate({ Stage, StageEvent, MeetGreet, SetTime }) {
      
      // define association here
      Event.belongsToMany(Stage, {
        foreignkey: "event_id",
        as: "stages",
        through: StageEvent
      })

      Event.hasMany(MeetGreet, {
        foreignkey: "event_id",
        as: "meet_greets"
      })

      Event.hasMany(SetTime, {
        foreignkey: "event_id",
        as: "set_times"
      })
    }
  }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  })
  return Event
}