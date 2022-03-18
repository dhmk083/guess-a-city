import Header from "components/Header";
import CardsList from "components/CardsList";
import Footer from "components/Footer";
import { Game } from "types";
import styles from "./styles.module.scss";

const App = ({ game }: { game: Game }) => (
  <div className={styles.app}>
    <header className={styles.header}>
      <Header game={game} />
    </header>
    <main className={styles.main}>
      <CardsList game={game} />
    </main>
    <Footer />
  </div>
);

export default App;
