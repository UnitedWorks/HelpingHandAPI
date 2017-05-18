import { bookshelf } from '../orm';
import { User } from '../users/models';

export const Goal = bookshelf.Model.extend({
  tableName: 'goals',
  hasTimeStamps: true,
  quest(){
    return this.hasOne(Quest, 'quest_id');
  },
});

export const Proof = bookshelf.Model.extend({
  tableName: 'proofs',
  hasTimeStamps: true,
  goal() {
    return this.hasOne(Goal, 'goal_id');
  },
  user(){
    return this.hasOne(User, 'user_id');
  },
});

export const Quest = bookshelf.Model.extend({
  tableName: 'quests',
  hasTimeStamps: true,
  goals() {
    return this.hasMany(Goal, 'quest_id');
  },
});
