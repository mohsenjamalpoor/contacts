import { useState } from "react";
import inputs from "../constants/inputs";
import styles from "./Contacts.module.css";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

function Contacts() {
  const [contacts, setContacts] = useState([
    { id: "1", name: "محسن", lastName: "جمالپور", email: "mohsen@gmail.com", job: "پرستار", phone: "09376674097" },
    { id: "2", name: "علی", lastName: "احمدی", email: "ali@gmail.com", job: "برنامه‌نویس", phone: "09123456789" },
    { id: "3", name: "رضا", lastName: "کریمی", email: "reza@gmail.com", job: "معلم", phone: "09223334455" },
    { id: "4", name: "اشکان", lastName: "رضایی", email: "ash@gmail.com", job: "معلم", phone: "09223337855" },
    { id: "5", name: "احمد", lastName: "پناهی", email: "ahmad@gmail.com", job: "پزشک", phone: "09223335855" },
    { id: "6", name: "محمد", lastName: "یوسفی", email: "moha@gmail.com", job: "مهندس", phone: "09223334455" },
  ]);

  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    job: ""
  });

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const filteredContacts = contacts.filter((contact) => 
    contact.name.includes(search) ||
    contact.lastName.toLowerCase().includes(search.toLowerCase()) || 
    contact.email.toLowerCase().includes(search.toLowerCase())
  );


  const selectedHandler = (id) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
    
  
    setSelectAll(false);
  };

  const selectAllHandler = () => {
    if (!selectAll) {
   
      const allIds = filteredContacts.map(contact => contact.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
    setSelectAll(!selectAll);
  };

  
  const deleteAllHandler = () => {
    if (selected.length === 0) {
      toast("هیچ مخاطبی انتخاب نشده است");
      return;
    }
    
    const remainedContacts = contacts.filter((contact) => !selected.includes(contact.id));
    setContacts(remainedContacts);
    setSelected([]);
    setSelectAll(false);
    toast.success("مخاطبین انتخاب شده با موفقیت حذف شدند");
  };


  const deleteHandler = () => {
    const newContacts = contacts.filter((contact) => contact.id !== contactToDelete.id);
    setContacts(newContacts);
    setShowDeleteModal(false);
    setContactToDelete(null);
    toast.success("مخاطب با موفقیت حذف شد");
  };


  const editHandle = (contactToEdit) => {
    setContact({ ...contactToEdit });
    setEditingContact(contactToEdit);
    setShowModal(true);
    setActiveId(null);
  };


  const addHandler = () => {
    setContact({
      id: Date.now().toString(),
      name: "",
      lastName: "",
      email: "",
      phone: "",
      job: ""
    });
    setEditingContact(null);
    setShowModal(true);
  };

 
  const saveHandler = () => {
    if (!contact.name || !contact.lastName || !contact.email || !contact.phone || !contact.job) {
      toast.error("لطفاً تمام اطلاعات را کامل پر کنید");
      return;
    }

    if (editingContact) {
    
      setContacts(contacts.map(c => (c.id === editingContact.id ? contact : c)));
      toast.success("مخاطب با موفقیت ویرایش شد");
    } else {
    
      setContacts((contacts) => [...contacts, contact]);
      toast.success("مخاطب جدید با موفقیت اضافه شد");
    }


    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      job: ""
    });
    setShowModal(false);
    setEditingContact(null);
  };


  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };


  const closeModal = () => {
    setShowModal(false);
    setContact({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      job: ""
    });
    setEditingContact(null);
  };


  const openDeleteModal = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
    setActiveId(null);
  };


  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.search}>
            <label htmlFor="search">جستجوی مخاطبین :</label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="نام، نام خانوادگی یا ایمیل"
            />
          </div>
          <div className={styles.addbtn}>
            {selected.length > 0 && (
              <button onClick={deleteAllHandler} className={styles.deleteAllBtn}>
                حذف همه ({selected.length})
              </button>
            )}
            <button 
              onClick={selectAllHandler} 
              className={`${styles.selectAllCheckbox} ${selectAll ? styles.selected : ''}`}
            >
              {selectAll ? '✔' : '✔'}
            </button>
            <button onClick={addHandler} className={styles.addBtn}>+ افزودن</button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>انتخاب</th>
                <th>نام و نام خانوادگی</th>
                <th>ایمیل</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr className={`${styles.tableTr} ${selected.includes(contact.id) ? styles.selectedRow : ''}`} key={contact.id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => selectedHandler(contact.id)}
                        checked={selected.includes(contact.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td>{contact.name} {contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td className={styles.actionsCell}>
                      <button 
                        className={styles.tableBtn} 
                        onClick={() => setActiveId(activeId === contact.id ? null : contact.id)}
                      >
                        ⋮
                      </button>
                      {activeId === contact.id && (
                        <div className={styles.actionMenu}>
                          <button 
                            onClick={() => editHandle(contact)} 
                            className={styles.editBtn}
                          >
                            <MdEdit /> ویرایش
                          </button>
                          <button 
                            className={styles.deleteBtn} 
                            onClick={() => openDeleteModal(contact)}
                          >
                            <MdDelete /> حذف
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.noResult}>
                    <div className={styles.emptyState}>
                      <p><IoMdSearch /> مخاطبی یافت نشد</p>
                      {search && (
                        <button onClick={() => setSearch('')} className={styles.clearSearch}>
                          پاک کردن جستجو
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* مودال افزودن/ویرایش */}
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>{editingContact ? " ویرایش مخاطب" : "افزودن مخاطب جدید"}</h3>
              {inputs.map((input, index) => (
                <input
                  key={index}
                  type={input.type || "text"}
                  placeholder={input.placeholder}
                  value={contact[input.name] || ""}
                  name={input.name}
                  onChange={changeHandler}
                  className={styles.formInput}
                />
              ))}
              <div className={styles.modalButtons}>
                <button onClick={saveHandler} className={styles.saveBtn}>
                  <BiSave/> ذخیره
                </button>
                <button onClick={closeModal} className={styles.cancelBtn}>
                  X لغو
                </button>
              </div>
            </div>
          </div>
        )}

        {/* مودال تأیید حذف */}
        {showDeleteModal && contactToDelete && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.deleteModal}>
                <p className={styles.deleteMessage}>
                  شما در حال حذف مخاطب <strong>{contactToDelete.name} {contactToDelete.lastName}</strong> هستید.
                  <br />
                  آیا از این کار مطمئن هستید؟
                </p>
                <div className={styles.modalButtons}>
                  <button onClick={deleteHandler} className={styles.confirmDeleteBtn}>
                    <MdDelete /> حذف
                  </button>
                  <button onClick={closeDeleteModal} className={styles.cancelBtn}>
                    X انصراف
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default Contacts;