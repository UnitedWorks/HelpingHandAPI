import { Router } from 'express';
import { Quest, Goal } from './models';

const router = new Router();

router.route('/')
  .get((req, res, next) => {
    if (req.query.id) {
      Quest.where({ id: req.query.id }).fetch({ withRelated: ['goals'] })
        .then((data) => {
          res.status(200).send({
            quest: data.toJSON(),
          });
        });
    } else {
      Quest.where({ approved: true }).fetchAll({ withRelated: ['goals'] })
        .then((data) => {
          res.status(200).send({
            quests: data.toJSON(),
          })
        });
    }
  })
  .post((req, res, next) => {
    const quest = req.body.quest;
    delete quest.goals;
    const goals = req.body.quest.goals;
    Quest.forge(req.body.quest).save().then((newQuest) => {
      const goalForges = [];
      goals.forEach((goal) => {
        if (goal.ask.length > 0 && goal.giving.length > 0 && goal.proof_instructions.length > 0) {
          goalForges.push(Goal.forge({ ...goal, quest_id: newQuest.get('id')}));
        }
      });
      Promise.all(goalForges).then(() => {
        res.status(200).send();
      });
    });
  });


module.exports = router;
