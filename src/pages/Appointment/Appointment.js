import styles from "./Appointment.module.scss";

function Appointment() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Prendre RDV</h1>
      <p className={styles.mainParagraph}>
        Je suis déterminée à vous offrir un service exceptionnel qui répond à
        vos besoins de beauté et de bien-être. Pour rendre votre expérience
        aussi pratique que possible, je vous propose deux moyens faciles de
        prendre rendez-vous : par téléphone ou en utilisant le formulaire de
        rendez-vous en ligne.
      </p>
      <section className={styles.rdv}>
        <div>
          <h2 className={styles.title}>Téléphone</h2>
          <p className={styles.paragraph}>
            Si vous préférez un contact personnel, je suis prête à répondre à
            vos appels et à planifier votre rendez-vous. Je serais ravis de
            discuter de vos besoins et de trouver le créneau horaire qui vous
            convient le mieux.
          </p>
          <a href="tel:+33604197561" className={styles.phoneNumber}>
            06 04 19 75 61
          </a>
        </div>
        <div>
          <h2 className={styles.title}>Rendez-vous en ligne</h2>
          <p className={styles.paragraph}>
            La vie est trépidante, c'est pourquoi je vous propose également la
            possibilité de prendre rendez-vous en ligne. Remplissez simplement
            le formulaire de rendez-vous en ligne en indiquant vos préférences
            de date et d'heure, ainsi que les services que vous désirez. Je vous
            confirmerais rapidement votre rendez-vous par e-mail.
          </p>
        </div>
      </section>
      <section className={styles.rdvForm}>
        <h3>- Formulaire de prise de rdv -</h3>
        <p>Formulaire en construction</p>
      </section>
      <section className={styles.contact}>
        <h2 className={styles.title}>
          Besoin de plus d'Informations ? Contactez-moi !
        </h2>
        <p className={styles.paragraph}>
          Je suis là pour répondre à toutes vos questions et pour vous fournir
          toutes les informations dont vous pourriez avoir besoin. Si vous
          souhaitez discuter de nos services, obtenir des détails sur les offres
          spéciales, ou si vous avez des questions concernant votre rendez-vous,
          n'hésitez pas à me contacter en utilisant le formulaire de contact
          ci-dessous.
        </p>
        <section className={styles.contactForm}>
          <h3>- Formulaire de contact -</h3>
          <p>Formulaire en construction</p>
        </section>
      </section>
    </div>
  );
}

export default Appointment;
