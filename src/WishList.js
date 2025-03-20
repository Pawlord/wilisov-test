import React, { useState } from 'react';

function EmptyWishList() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontWeight: 600, fontFamily: 'Arial' }}>Пока желаний нет</h2>
    </div>
  )
}

export function WishList() {
  const [value, setValue] = useState('');
  const [wishList, setWishList] = useState([]);
  const [uniqueCode, setUniqueCode] = useState(1);

  const handleChange = e => {
    setValue(e.target.value);
  }

  const handleAddWish = () => {
    if (!value) return alert('Введите желание!');

    const newWish = { id: uniqueCode, text: value };
    setWishList(prev => [...prev, newWish])
    setValue('');
    setUniqueCode(prev => prev + 1);
  }

  const handleDeleteWish = (id) => {
    setWishList(wishList.filter(item => item.id !== id));
  }

  console.log(wishList)

  return (
    // Основной контейнер приложения для выравнивания по центру
    <div style={{ width: '100%', height: '100vh', fontFamily: 'Arial', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Контейнер для контента, чтобы тоже центрировать и правильно расположить */}
      <div style={{ width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '50px' }}>Введите желание</h1>

        {/* Контейнер для инпута и кнопки, чтобы правильно их расположить */}
        <div style={{ width: '75%', display: 'flex' }}>
          <input
            style={{ padding: '10px 20px', border: 'none', borderBottom: '1px solid #eee', fontSize: '1rem' }}
            value={value}
            onChange={e => handleChange(e)}
            placeholder='Введите желание...'
          />
          <button
            style={{ marginLeft: 'auto', border: 'none', outline: 'none', borderRadius: '7px', color: '#fff', fontSize: '1rem', padding: '10px 15px', backgroundColor: '#6d6dff', cursor: 'pointer', fontWeight: 600 }}
            onClick={handleAddWish}
          >
            Добавить
          </button>
        </div>

        {/* Контейнер для списка желаний */}
        <div style={{ marginTop: '20px', padding: '20px', width: '50%' }}>
          {
            wishList.length === 0
              ? <EmptyWishList />
              : wishList.map(item =>
                <div
                  key={item.id}
                  style={{ display: 'flex', gap: '15px', alignItems: 'center' }}
                >
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.text}</p>
                  <button
                    onClick={() => handleDeleteWish(item.id)}
                    style={{ marginLeft: 'auto', border: 'none', outline: 'none', borderRadius: '7px', color: '#fff', fontSize: '1rem', padding: '10px 15px', backgroundColor: '#e85c5c', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Удалить
                  </button>
                </div>)
          }
        </div>
      </div>
    </div>
  );
}

/**
 * Для оптимизации приложения и для интеграции с бэком я бы:
 * 1. Декомпозировал компонент, вынеся элемент списка в отдельный компонент, а также возможно блок "Желаний нет", для того чтобы не захламлять код;
 * 2. Не использовал бы инлайновые стили а выбрал бы либо css-in-js в лице styled-components, linaria или tailwind, ну либо же использование SCSS или css modules
 * 3. Вынес бы логику либо в контекст, если это небольшое приложение будет немасштабируемое, либо же вынес в стейт менеджер, т.к. он более гибок в работе и предлагает удобные функции и логику для работы с состоянием, ну самый банальный пример redux;
 * 4. Для интеграции приложения с бэком отлично подошел бы redux т.к. он поддерживает асинхронные thunk где можно делать запросы на сервер, передавать query параметры и т.д. Ну а также обрабатывать полученные данные и иммутабельно изменять состояние приложения.
 *  */
