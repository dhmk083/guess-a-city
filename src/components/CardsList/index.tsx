import { observer } from "@dhmk/atom-react";
import Card from "components/Card";
import { Game } from "types";
import styles from "./styles.module.scss";

export default observer(({ game }: { game: Game }) => (
  <div className={styles.wrap}>
    {game.cards().map((card, i) => (
      <div key={card.id}>
        <Card key={card.id} card={card} index={i + 1} game={game} />
      </div>
    ))}
  </div>
));
