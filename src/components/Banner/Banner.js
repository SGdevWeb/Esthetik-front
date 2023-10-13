import styles from "./Banner.module.scss";

const Banner = ({ text, backgroundImage }) => {
  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <div className={styles.container} style={bannerStyle}>
      <p>{text}</p>
    </div>
  );
};

export default Banner;
