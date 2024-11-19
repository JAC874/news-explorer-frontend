import "../About/About.css";
import selfie from "../../assets/jordon-selfie.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__selfie-container">
        <img
          src={selfie}
          alt="Selfie of application author"
          className="about__selfie"
        />
      </div>
      <div className="about__info">
        <h3 className="about__title">About the author</h3>
        <p className="about__text">
          I’m Jordon, a full-stack software engineer and seasoned pianist and
          conductor for Broadway productions, now exploring exciting
          opportunities in the web development and tech industry.
        </p>
        <p className="about__text">
          After years in the performing arts, I recently completed a
          comprehensive full-stack software engineering program with TripleTen.
          Throughout the program, I built several full-stack and frontend
          projects using technologies like HTML/CSS, React, MongoDB, Express,
          Node.js, JavaScript, and more. Solving coding challenges felt similar
          to fine-tuning a musical score—different approaches, creative
          problem-solving, and the joy of crafting something impactful. I am
          self-driven, detail-oriented, and thrive in collaborative environments
          where I can contribute to meaningful projects. I'm eager to bring my
          creativity, discipline, and technical skills to the world of tech.
        </p>
        <p className="about__text"></p>
      </div>
    </section>
  );
}

export default About;
