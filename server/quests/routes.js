import { Router } from 'express';
import { Quest } from './models';

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
      Quest.fetchAll({ withRelated: ['goals'] })
        .then((data) => {
          res.status(200).send({
            quests: data.toJSON(),
          })
        });
    }
  });


module.exports = router;
