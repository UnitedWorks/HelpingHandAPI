import { Router } from 'express';
import { Quest } from './models';

const router = new Router();

router.route('/')
  .get((req, res, next) => {
    const query = Quest.where(req.query);
    if (req.query.id) {
      query.fetch({ withRelated: ['goals', 'goals.proofs', 'goals.proofs.users'] })
        .then((data) => {
          res.status(200).send({
            quest: data.toJSON(),
          });
        });
    } else {
      query.fetchAll({ withRelated: ['goals'] })
        .then((data) => {
          res.status(200).send({
            quests: data.toJSON(),
          })
        });
    }
  });


module.exports = router;
