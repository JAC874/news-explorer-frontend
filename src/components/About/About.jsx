import "../About/About.css";
import selfie from "../../assets/jordon-selfie.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__selfie-container">
        <img src={selfie} alt="" className="about__selfie" />
      </div>
      <div className="about__info">
        <h3 className="about__title">About the author</h3>
        <p className="about__text">About me intro placeholder</p>
        <p className="about__text">About me text placeholder</p>
      </div>
    </section>
  );
}

export default About;
