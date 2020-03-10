const common = require('./common');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AffixSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  descShort: {type: String, required: true},
  descLong: {type: String, required: true},
  source: {
    type: String,
    enum: common.sources,
    required: true,
  },
  cost: {
    type: Number,
    default: 1,
  },
  maxReplicates: {
    type: Number,
    min: 0,
    default: 1,
  },
  doubleEdged: {type: Boolean, default: false},
  slot: {
    type: String,
    enum: ['arms', 'armor', 'trinket', 'consumable'],
    required: true,
  },
  affixType: {
    type: String,
    enum: ['advanced', 'exotic', 'prismatic', 'mundane'],
    required: true,
  },
  prerequisites: String,
  tags: {
    type: [String],
    enum: common.affixTags,
  },
  elements: {
    type: [String],
    enum: [
      'physical',
      'arcane',
      'eldritch',
      'air',
      'earth',
      'fire',
      'water',
      'primal',
      'decay',
      'radiant',
      'umbral',
      'corrosion',
      'electric',
      'specified',
    ],
  }
});

AffixSchema.index({ source: 1, name: 1 }, { unique: true });

AffixSchema.on('index', (err) => console.log(err.message));

module.exports = mongoose.model('Affix', AffixSchema);
