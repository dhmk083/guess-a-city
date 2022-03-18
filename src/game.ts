import { atom, runInAction, DeepWritable } from "@dhmk/atom";
import { Game, Card } from "types";
import getCardFactory from "./provider";

const createGame = () => {
  let id = 0;

  const getCard = getCardFactory();

  const load = async (card: DeepWritable<Card>) => {
    try {
      runInAction(() => {
        card.loading.set(true);
      });

      const data = await getCard();

      runInAction(() => {
        card.data.set(data);
        card.error.set(null);
      });
    } catch (e: any) {
      runInAction(() => {
        card.error.set(`An error has occurred: ${e.message}`);
      });
    } finally {
      runInAction(() => {
        card.loading.set(false);
      });
    }
  };

  const game: DeepWritable<Game> = {
    cards: atom([] as any),
    score: atom(0),

    reset() {
      runInAction(() => {
        game.cards.set([]);
        game.score.set(0);
        game.loadCard();
      });
    },

    async loadCard() {
      runInAction(() => {
        let card = game.cards()[game.cards().length - 1];

        if (!card?.error()) {
          card = {
            id: (id++).toString(),
            loading: atom(true),
            error: atom(null),
            data: atom(null),
            answer: atom(null),
          } as DeepWritable<Card>;

          game.cards.set(game.cards().concat(card));
        }

        load(card);
      });
    },

    guess(id) {
      runInAction(() => {
        const card = game.cards()[game.cards().length - 1];
        if (!card || card.answer()) return;

        const data = card.data();
        if (!data) return;

        card.answer.set(id);
        if (data.correct === id) game.score.set(game.score() + 1);

        game.loadCard();
      });
    },
  };

  game.loadCard();

  return game as Game;
};

export default createGame;
