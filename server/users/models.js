import { bookshelf } from '../orm';
import { Proof, Quest } from '../quests/models';

export const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
  proofs(){
    return this.belongsToMany(Proof, 'user_id');
  },
  quests(){
    return this.belongsToMany(Quest, 'users_quests');
  }
});
