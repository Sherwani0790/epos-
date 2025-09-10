import React from "react";
import styles from "./globalticketcards.module.css";
const GlobalTicketCards = () => {
  const tickets = [
    {
      id: 1,
      ticket_text: "Unable to Log into the current Portal",
      ticket_date: "12-03-2023",
      ticket_long_text:
        "I am currently experiencing difficulties to find out the logs",
    },
    {
      id: 2,
      ticket_text: "Unable to Log into the current Portal",
      ticket_date: "12-03-2023",
      ticket_long_text:
        "I am currently experiencing difficulties to find out the logs",
    },
    {
      id: 3,
      ticket_text: "Unable to Log into the current Portal",
      ticket_date: "12-03-2023",
      ticket_long_text:
        "I am currently experiencing difficulties to find out the logs",
    },
    {
      id: 4,
      ticket_text: "Unable to Log into the current Portal",
      ticket_date: "12-03-2023",
      ticket_long_text:
        "I am currently experiencing difficulties to find out the logs",
    },
    // Add more ticket objects here
  ];

  const ticketElements = tickets.map((ticket, index) => (
    <div key={index} className={styles.tickets_card}>
      <div className={styles.ticket_text}>
        <p className={styles.ticket_text_p}>{ticket.ticket_text}</p>
        <span className={styles.ticket_text_span}>{ticket.ticket_date}</span>
      </div>
      <p className={styles.ticket_long_text}>{ticket.ticket_long_text}</p>
    </div>
  ));

  return (
    <>
      <div>{ticketElements}</div>
    </>
  );
  // return (
  //   <>
  //     <div className={styles.tickets_card}>
  //       <div className={styles.ticket_text}>
  //         <p className={styles.ticket_text_p}>
  //           Unable to Log into the current Portal
  //         </p>
  //         <span className={styles.ticket_text_span}>12-03-2023</span>
  //       </div>
  //       <p className={styles.ticket_long_text}>
  //         I am currently experiencing difficulties to find out the logs
  //       </p>
  //     </div>

  //   </>
  // );
};

export default GlobalTicketCards;
