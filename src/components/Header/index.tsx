import { observer } from "@dhmk/atom-react";
import AnimatedDiff from "components/AnimatedDiff";
import Button from "components/Button";
import { Game } from "types";
import styles from "./styles.module.scss";

export default observer(({ game }: { game: Game }) => (
  <div className={styles.wrap}>
    <Button onClick={() => game.reset()}>New game</Button>
    <div className={styles.score}>
      <AnimatedDiff className={styles.scoreDiff} value={game.score()} />
      <span>Score: {game.score()}</span>
    </div>
  </div>
));
