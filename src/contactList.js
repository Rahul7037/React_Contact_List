import React, { useState, useEffect } from "react";
import "./contactList.css";

function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [editedContact, setEditedContact] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load contacts from local storage on component mount
    useEffect(() => {
        const savedContacts = JSON.parse(localStorage.getItem("contacts"));
        if (savedContacts) {
            setContacts(savedContacts);
        }
    }, []);

    // Save contacts to local storage whenever the 'contacts' state is updated
    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const phone = e.target.elements.phone.value;
        const email = e.target.elements.email.value;
        const id = contacts.length + 1;
        const newContact = { id, name, phone, email };
        setContacts([newContact, ...contacts]);
        e.target.reset();
    };
    const handleDelete = (id) => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
    };

    const handleEdit = (id) => {
        const contactToEdit = contacts.find((contact) => contact.id === id);
        setEditedContact(contactToEdit);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const phone = e.target.elements.phone.value;
        const email = e.target.elements.email.value;
        const id = editedContact.id;
        const updatedContact = { id, name, phone, email };
        const updatedContacts = contacts.map((contact) =>
            contact.id === id ? updatedContact : contact
        );
        setContacts(updatedContacts);
        setEditedContact(null);
        e.target.reset();
    };

    return (
        <>
            <div className="contact-add">
                <h1>Add Contact</h1>
                <form onSubmit={editedContact ? handleUpdate : handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        required
                        defaultValue={editedContact ? editedContact.name : ""}
                    />
                    <br />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone"
                        required
                        defaultValue={editedContact ? editedContact.phone : ""}
                    />
                    <br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                        defaultValue={editedContact ? editedContact.email : ""}
                    />
                    <br />
                    <button>{editedContact ? "Update Contact" : "Add Contact"}</button>
                    {editedContact && (
                        <button onClick={() => setEditedContact(null)}>Cancel</button>
                    )}
                </form>
            </div>
            <div className='contact_list'>
                <header>
                    <img src="https://cdn-icons-png.flaticon.com/512/1250/1250592.png" alt="No Image"></img>
                    <h1>My Contacts List</h1>
                </header>
                {isLoading ? (
                    <div>Loading ...</div>) : (
                    <div className="data">
                        {contacts.length === 0 ? (
                            <div>No contacts found.</div>
                        ) : (

                            contacts.map((contact) => (
                                <div key={contact.id} className="contact">
                                    <h2>{contact.name}<img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Don't Image" onClick={() => handleEdit(contact.id)}></img>
                                        <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Nothing" onClick={() => handleDelete(contact.id)}></img></h2>
                                    <p>{contact.phone}</p>
                                    <p>{contact.email}</p><hr />
                                </div>
                            ))
                        )}
                    </div>
                )};

            </div>
        </>
    );
}

export default ContactList;
