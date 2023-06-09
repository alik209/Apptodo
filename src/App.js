import React, { useState } from "react";
import "./App.css";

function App() {
  // Состояние с помощью хука useState

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

// Вспомогательные функции

/* Добавляет новый элемент в массив списка */

  function addItem() {
    // ! Проверка на пустой элемент

    if (!newItem) {
      alert("Введите элемент.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
// Добавление нового элемента в массив items

    setItems((oldList) => [...oldList, item]);
// Сброс newItem в исходное состояние

    setNewItem("");
  }

  /* Удаляет элемент на основе ключа item.id */

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

/* Изменяет текст элемента после его создания */

  function editItem(id, newText) {
    // Получение текущего элемента

    const currentItem = items.filter((item) => item.id === id);
// Создание нового элемента с тем же id

    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);
// Замена элемента в списке элементов

    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }
// Основная часть приложения

  return (
    <div className="app">
      {/* 1. Header  */}
      <h1>Мой список дел</h1>

        {/* 2. Добавление нового элемента (ввод) */}


      <input
        type="text"
        placeholder="Введите элемент."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
  {/* Кнопка "Добавить" */}

      <button onClick={() => addItem()}>Добавить</button>
        {/* 3. Список дел (неупорядоченный список) */}


      <ul>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
              </li>

              {showEdit == item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;