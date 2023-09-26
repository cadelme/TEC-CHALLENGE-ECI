import React, { useState } from 'react';
import './ListForm.css'




const ListForm = () => {

    const [showModal, setShowModal] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [items, setItems] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [deletedOptions, setDeletedOptions] = useState([])




    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([...items, inputValue])
        setInputValue('')
        setShowModal(false)


    };

    const handleSelectChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (item) => item.value);
        setSelectedOptions(selectedValues);
    };


    const handleRemoveSelected = () => {
        const newOptions = items.filter((item) => !selectedOptions.includes(item));
        const removedOptions = items.filter((item) => selectedOptions.includes(item));
        setItems(newOptions);
        setSelectedOptions([]);
        setDeletedOptions(removedOptions);


    }

    const handleRedo = () => {
        const newItems = [...items, ...deletedOptions]
        const sortedItems = newItems.sort();
        setItems(sortedItems);
        setDeletedOptions([])
    };


    const openModal = () => {
        setShowModal(true)
    };

    const closeModal = () => {
        setShowModal(false)
    };

    return (

        <div className="ListForm">

            <select name="itemList" className='itemList' value={selectedOptions} onChange={handleSelectChange} multiple>

                {items.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <div className='Buttons-list'>
                <button onClick={handleRedo}>Redo</button>
                <button onClick={handleRemoveSelected}>Delete</button>


                <button className="addButton" onClick={openModal}>ADD</button>
            </div>


            <div>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <form onSubmit={handleSubmit}>
                                <h2>Add item to list</h2>
                                <p>
                                    <input className="inputString" type='text' placeholder='Type the text here' value={inputValue} onChange={handleInputChange}></input>
                                </p>

                                <button type="submit" disabled={!inputValue}>ADD</button>
                                <button onClick={closeModal}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

        </div>

    )
}

export default ListForm