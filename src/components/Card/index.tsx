import cn from "classnames";
import { observer } from "@dhmk/atom-react";
import Button from "components/Button";
import { Card, Game } from "types";
import quiz from "./quiz.svg";
import styles from "./styles.module.scss";

type Props = {
  index: number;
  card: Card;
  game: Game;
};

export default observer(({ index, card, game }: Props) => {
  const body = () => {
    const data = card.data();

    if (card.loading())
      return (
        <div className={styles.spinnerWrap}>
          <div className={styles.spinner} />
          Loading...
        </div>
      );

    if (card.error() || !data)
      return (
        <div className={styles.error}>
          <p>{card.error()}</p>
          <Button onClick={() => game.loadCard()}>Reload</Button>
        </div>
      );

    return (
      <>
        <div className={styles.cityImage}>
          <img src={data.img} alt="city" />
        </div>
        <div className={styles.choices}>
          {data.choices.map((choice) => (
            <Button
              key={choice.id}
              className={cn(
                card.answer() && choice.id === data.correct && styles.correct,
                card.answer() && choice.id === card.answer() && styles.wrong
              )}
              disabled={!!card.answer()}
              onClick={() => game.guess(choice.id)}
            >
              {choice.name}
            </Button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={quiz} alt="quiz" className={styles.icon} />
        <div className={styles.caption}>
          <h3>Which city is this?</h3>
          <p>Click on the correct answer below</p>
        </div>
        <div className={styles.index}># {index}</div>
      </div>
      {body()}
    </div>
  );
});
