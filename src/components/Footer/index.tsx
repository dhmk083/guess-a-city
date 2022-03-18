import styles from "./styles.module.scss";

const Footer = () => (
  <div className={styles.wrap}>
    <div>
      Icons made by{" "}
      <a href="https://www.flaticon.com/authors/dmitri13" title="dmitri13">
        dmitri13
      </a>
      ,{" "}
      <a
        href="https://www.flaticon.com/authors/zlatko-najdenovski"
        title="Zlatko Najdenovski"
      >
        {" "}
        Zlatko Najdenovski
      </a>{" "}
      from{" "}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </div>
  </div>
);

export default Footer;
