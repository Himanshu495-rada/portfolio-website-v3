import styles from "./ProfileContent.module.css";
import profile from "../../assets/profile.jpg";
import { MdOutlineEmail } from "react-icons/md";
import { VscGithubAlt } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

const ProfileContent = () => {
  function calculateExperience(startDateString: string): string {
    const startDate = new Date(startDateString);
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return `${years} Years ${months} Months`;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img
          src={profile}
          alt="Profile Photo"
          className={styles.profilePhoto}
        />
        <div className={styles.profileInfo}>
          <h1>Himanshu Tekade</h1>
          <h2>Full Stack Developer</h2>
          {/* add total experience */}
          <h3 className={styles.experience}>
            Total Experience: {calculateExperience("2022-07-01")}
          </h3>
          <p className={styles.description}>
            Welcome to my interactive portfolio! Navigate through the file
            explorer to discover my projects, skills, and experience.
          </p>
          <p className={styles.subtitle}>
            This portfolio is built like VS Code - click on files in the
            explorer to see different sections of my work.
          </p>
        </div>
      </div>

      <div className={styles.contactSection}>
        <h3>Get in Touch</h3>
        <div className={styles.socialLinks}>
          <a href="mailto:himanshuyt20@gmail.com" className={styles.socialLink}>
            <MdOutlineEmail size={24} />
            <span>himanshuyt20@gmail.com</span>
          </a>
          <a
            href="https://github.com/Himanshu495-rada/"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <VscGithubAlt size={24} />
            <span>GitHub Profile</span>
          </a>
          <a
            href="https://linkedin.com/in/himanshu-tekade-82034b194"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin size={24} />
            <span>LinkedIn Profile</span>
          </a>
          <a
            href="/Himanshu-Yashwant-Tekade-Resume.pdf"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiDownload size={24} />
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3>About Me</h3>
        <p>
          Full Stack Developer with 3+ years of experience delivering scalable
          web applications using React.js, Node.js, Django, and PostgreSQL.
        </p>
        <p>
          Proficient in REST API development, state management, and component
          optimization. I have a strong foundation in software engineering,
          Agile development, cloud technologies (AWS), and data processing using
          Numpy and Pandas.
        </p>
      </div>

      <div className={styles.skillsPreview}>
        <h3>Core Skills</h3>
        <div className={styles.skillTags}>
          <span className={styles.skillTag}>React.js</span>
          <span className={styles.skillTag}>TypeScript</span>
          <span className={styles.skillTag}>Node.js</span>
          <span className={styles.skillTag}>Django</span>
          <span className={styles.skillTag}>PostgreSQL</span>
          <span className={styles.skillTag}>AWS</span>
          <span className={styles.skillTag}>Next.js</span>
          <span className={styles.skillTag}>Python</span>
          <span className={styles.skillTag}>Redux</span>
          <span className={styles.skillTag}>Playwright</span>
          <span className={styles.skillTag}>Jenkins</span>
        </div>
        <p className={styles.exploreNote}>
          💡 Explore the <strong>Skills.md</strong> file in the Portfolio folder
          for detailed information!
        </p>
      </div>
    </div>
  );
};

export default ProfileContent;
