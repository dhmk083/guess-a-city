import { Atom } from "@dhmk/atom";

export type Id = string;

export type Card = {
  id: Id;
  loading: Atom<boolean>;
  error: Atom<string | null>;

  data: Atom<{
    img: string;
    choices: readonly { id: Id; name: string }[];
    correct: Id;
  } | null>;

  answer: Atom<Id | null>;
};

export type Game = {
  cards: Atom<readonly Card[]>;
  score: Atom<number>;

  reset();
  loadCard();
  guess(id: Id);
};
