import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import AlertContext from "../../context/alert/alertContext";
import ContactItem from "./ContactItem";
import Spinner from "../../components/layout/Spinner";
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
   
    if (contactContext.error !== null) {
     
      contactContext.error["errors"].forEach(element => {
        alertContext.setAlert(element.msg.toString(), "danger");
      });
      contactContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [contactContext.error]);

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
